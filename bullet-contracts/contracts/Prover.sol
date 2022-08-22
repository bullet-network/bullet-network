// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import { IBondManager } from "./interfaces/IBondManager.sol";
import { ITransactionChain } from "./interfaces/ITransactionChain.sol";
import { IStateCommitments } from "./interfaces/IStateCommitments.sol";

contract Prover {
    address bondManagerAddress;
    address transactionChainAddress;
    address stateCommitmentAddress;

    constructor(address _bondManagerAddress, address _transactionChainAddress, address _stateCommitmentAddress) {
        bondManagerAddress = _bondManagerAddress;
        transactionChainAddress = _transactionChainAddress;
        stateCommitmentAddress = _stateCommitmentAddress;
    }

    function challenge(bytes10[] memory stateSet, bytes19[] memory txSet1, uint64 batchHeight, bytes19[][] memory postBatchTxSet) external {
        require(keccak256(abi.encodePacked(txSet1)) == ITransactionChain(transactionChainAddress).getBatchTxRoot(batchHeight));
        require(getRoot10(stateSet) == IStateCommitments(stateCommitmentAddress).getBatchStateRoot(batchHeight-1));
        bytes19[][] memory accessList = new bytes19[][](1+postBatchTxSet.length); accessList[0] = txSet1;
        bytes32[] memory stateHashSet = new bytes32[](1+postBatchTxSet.length);
        if (ITransactionChain(transactionChainAddress).getBatchHeight() > batchHeight) {
            require(postBatchTxSet.length > 0);
            for (uint64 i = 1; i<=postBatchTxSet.length; i++) {
                require(keccak256(abi.encodePacked(postBatchTxSet[i-1])) == ITransactionChain(transactionChainAddress).getBatchTxRoot(batchHeight+i));
                accessList[i] = postBatchTxSet[i-1];
            }
        }
        for (uint64 k = 0; k<accessList.length; k++) {
            for (uint64 i = 0; i<accessList[k].length; i++) {
                uint32 to = uint32(bytes4(bytes20(uint160(bytes20(accessList[k][i] & 0xffffffff000000000000000000000000000000)) >> 120)));
                uint32 from = uint32(bytes4(bytes20(uint160(bytes20(accessList[k][i] & 0x00000000ffffffff0000000000000000000000)) >> 88)));
                uint32 amount = uint32(bytes4(bytes20(uint160(bytes20(accessList[k][i] & 0x0000000000000000ffffffffffffffff000000)) >> 24)));
                bytes2 nonce = bytes2(accessList[k][i] & 0x0000000000000000000000000000000000ffff);
                if (to == 0) {
                    uint64 fb = uint64(bytes8(bytes10(uint80(bytes10(stateSet[from] & 0xffffffffffffffff0000)) >> 8)));
                     if (fb < amount) {
                        IBondManager(bondManagerAddress).deleteBond(IStateCommitments(stateCommitmentAddress).getBatchStateSubmitter(batchHeight));
                    } else {
                        fb-=amount;
                        stateSet[from]=bytes10(abi.encodePacked(bytes8(fb), nonce));
                    }
                } else if(from == 0) {
                    uint64 tb = uint64(bytes8(bytes10(uint80(bytes10(stateSet[to] & 0xffffffffffffffff0000)) >> 8)));
                    tb+=amount-uint8(accessList[k][i][16])*1000;
                    stateSet[to]=bytes10(abi.encodePacked(bytes8(tb), nonce));
                } else {
                    uint64 fb = uint64(bytes8(bytes10(uint80(bytes10(stateSet[from] & 0xffffffffffffffff0000)) >> 8)));
                    if (fb < amount) {
                        IBondManager(bondManagerAddress).deleteBond(IStateCommitments(stateCommitmentAddress).getBatchStateSubmitter(batchHeight));
                    } else {
                        fb-=amount;
                        stateSet[to]=bytes10(abi.encodePacked(bytes8((uint64(bytes8(stateSet[to] & 0xffffffffffffffff0000)) >> 8) +amount), nonce));
                        stateSet[from]=bytes10(abi.encodePacked(bytes8(fb), nonce));
                    }
                }
            }
            stateHashSet[k] = getRoot10(stateSet);
        }
        if (stateHashSet[0] != IStateCommitments(stateCommitmentAddress).getBatchStateRoot(batchHeight)) {
            IBondManager(bondManagerAddress).deleteBond(IStateCommitments(stateCommitmentAddress).getBatchStateSubmitter(batchHeight));
        } else {
            IBondManager(bondManagerAddress).deleteBond(msg.sender);
        }
        for (uint64 i = 0; i<stateHashSet.length; i++) {
            IStateCommitments(stateCommitmentAddress).updateProvenState(batchHeight + i, stateHashSet[i]);
        }
    }

    function getRoot10(bytes10[] memory stateItems) pure public returns(bytes32) {
        bytes32[] memory hashes = new bytes32[](stateItems.length);
        for (uint64 i = 0; i<stateItems.length; i++) {
            hashes[i] = keccak256(abi.encodePacked(stateItems[i]));
        }
        bytes32[] memory chash = new bytes32[](stateItems.length);uint64 c = 0;
        while (hashes.length > 1) {
            if (chash.length == 1) return chash[0];
            for (uint64 i = 0; i<hashes.length; i+=2) {
                if (i+1 == hashes.length) {
                    chash[c] = keccak256(abi.encodePacked(hashes[i],keccak256(abi.encodePacked(bytes32(0)))));
                    break;
                } else {
                    chash[c] = keccak256(abi.encodePacked(hashes[i],hashes[i+1]));
                    c+=1;
                }
            }
            c = 0;
            hashes = chash;
            delete chash;
            chash = new bytes32[](hashes.length);
        }
        return hashes[0];
    }
}
