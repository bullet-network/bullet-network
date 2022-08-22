// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import { IBondManager } from "./interfaces/IBondManager.sol";
import { ITransactionChain } from "./interfaces/ITransactionChain.sol";
import { IAddressManager } from "./interfaces/IAddressManager.sol";

contract BatchChallenge {
    address bondManagerAddress;
    address transactionChainAddress;
    address addressManagerAddress;
    address sequencer;
    constructor(address _bondManagerAddress, address _transactionChainAddress, address _addressManagerAddress, address seq) {
        bondManagerAddress = _bondManagerAddress;
        transactionChainAddress = _transactionChainAddress;
        addressManagerAddress = _addressManagerAddress;
        sequencer = seq;
    }
    event SequencerSubmitReplacement(uint64 height);
    function challenge(uint8[] memory vs, bytes32[] memory rs, bytes32[] memory ss, bytes19[] memory disputedtx, uint64 height) public {
        require(ITransactionChain(transactionChainAddress).getBatchTxRoot(height) == keccak256(abi.encodePacked(disputedtx)));
        require(ss.length == disputedtx.length);
        require(vs.length == rs.length);
        require(ss.length == vs.length);
        bytes[] memory vrs = new bytes[](vs.length);
        for (uint64 i = 0; i<vs.length; i++) {
            vrs[i] = abi.encodePacked(vs, rs, ss);
        }
        require(ITransactionChain(transactionChainAddress).getBatchSigTxRoot(height) == keccak256(abi.encode(vrs)));
        delete vrs;
        bool t = false;
        bytes memory prefix = "\x19Ethereum Signed Message:\n32"; 
        address[] memory txAddress = new address[](disputedtx.length);
        
        for (uint i = 0; i<disputedtx.length; i++) {
            txAddress[i] = IAddressManager(addressManagerAddress).getAddr(uint32(bytes4(bytes20(uint160(bytes20(disputedtx[i] & 0xffffffff000000000000000000000000000000)) / 0x01000000000000000000000000000000))));
        }

        for (uint i = 0; i<vs.length; i++) {
            if (ecrecover(keccak256(abi.encodePacked(prefix,disputedtx)), vs[i], rs[i], ss[i]) != txAddress[i]) {
                delete disputedtx[i];
                IBondManager(bondManagerAddress).deleteBond(sequencer);
                t=true;
            }
        }
        if (t) {
            IBondManager(bondManagerAddress).deleteBond(sequencer);
            emit SequencerSubmitReplacement(height);
        } else {
            IBondManager(bondManagerAddress).deleteBond(msg.sender);
        }
    }
}