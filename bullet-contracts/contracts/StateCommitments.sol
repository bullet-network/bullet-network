// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import { IBondManager } from "./interfaces/IBondManager.sol";
import { ITransactionChain } from "./interfaces/ITransactionChain.sol";
import { IStateCommitments } from "./interfaces/IStateCommitments.sol";

// complete

/**
 * StateCommitment is the contract for storing the state commitment root of batches
 */
contract StateCommitments is IStateCommitments{

    address bondManagerAddress;
    address transactionChainAddress;
    address updaterAddress;

    constructor(address _bondManagerAddress, address _transactionChainAddress, address deployer) {
        bondManagerAddress = _bondManagerAddress;
        transactionChainAddress = _transactionChainAddress;
        updaterAddress = deployer;
    }

    function update(address proverAddress) external {
        require(msg.sender == updaterAddress);

        allowed[proverAddress] = true;

        delete updaterAddress;
    }
    
    mapping(address => bool) allowed;
    
    function isAllowedProveState(address addr) view private returns(bool){
        if (allowed[addr]) {
            return true;
        }
        return false;
    }

    uint32 public batchHeight = 0;
    
    mapping(uint => bytes32) stateRoots;
    mapping(uint => address) stateSubmitter;
    mapping(uint => uint) timestamp;
    
    function appendState(bytes32 stateRoot) public {
        require (IBondManager(bondManagerAddress).bonded(msg.sender));
        
        if (batchHeight + 1 <= ITransactionChain(transactionChainAddress).getBatchHeight()) {
            unchecked {
                batchHeight++;
            }
            
            stateRoots[batchHeight] = stateRoot;
            timestamp[batchHeight] = block.timestamp;
        } else {
            IBondManager(bondManagerAddress).deleteBond(msg.sender);
        }
    }
    
    function getBatchStateRoot(uint64 h) view public returns(bytes32) {
        return stateRoots[h];
    }
    
    function getBatchStateSubmitter(uint64 h) view public returns(address) {
        return stateSubmitter[h];
    }

    function updateProvenState(uint64 height, bytes32 root) public {
        require(isAllowedProveState(msg.sender));    
        stateRoots[height] = root;
    }
}
