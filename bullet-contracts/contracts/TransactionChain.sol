// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import { ITransactionChain } from "./interfaces/ITransactionChain.sol";
import { IL1Bridge } from "./interfaces/IL1Bridge.sol";
/**
 * The TransactionChain is the contract for storing the transactions from batches
 */
contract TransactionChain is ITransactionChain {
    address L1Bridge;
    uint64 public batchHeight = 0;
    uint64 public latestFinalizedBatch = 0;
    QueuedTransaction[] public txqueue;
    mapping(uint => bytes32) txhash;
    mapping(uint => bytes32) sighash;
    mapping(uint => uint) timestamp;
    mapping(address => bool) allowedBatch;
    mapping(address => bool) allowedL1Enqueue;
    Withdraw[] public upcomingWithdraw;
    mapping(uint => bool) disputes;
    mapping(uint => uint) disputeReplacement;
    event newTx();
    event newWithdraw();
    address owner;
    address txp;
    constructor(address o, address t) {
        owner = o;
        txp = t;
    }
    function updateDispute(uint64 h) public {
        require(txp == msg.sender);
        disputes[h] = true;
    }
    function updateAllow(address[] memory batchaddr, address[] memory queueaddr) external {
        require(msg.sender == owner);
        for (uint64 i = 0; i<batchaddr.length; i++) {
            allowedBatch[batchaddr[i]] = true;
        }
        for (uint64 i = 0; i<queueaddr.length; i++) {
            allowedL1Enqueue[queueaddr[i]] = true;
        }
    }
    
    function isAllowedBatch(address addr) view public returns(bool) {
        if (allowedBatch[addr] == true) {
            return true;
        }

        return false;
    }
    
    function isAllowedL1Enqueue(address addr) view public returns(bool) {
        if (allowedL1Enqueue[addr] == true) {
            return true;
        }

        return false;
    }
    function appendBatch(bytes19[] calldata transactions, Withdraw[] calldata withdraws, bytes[] calldata sig, uint64 height) public {
        require(isAllowedBatch(msg.sender));
        timer();
        
        unchecked {
            batchHeight++; // Height can't go over 2^64
        }
        
        txhash[batchHeight] = keccak256(abi.encodePacked(transactions));
        timestamp[batchHeight] = block.timestamp;
        sighash[batchHeight] = keccak256(abi.encode(sig));
        
        for (uint64 i = 0; i < withdraws.length; i++) {
            upcomingWithdraw.push(withdraws[i]);
            emit newWithdraw();
        }
    }

    function getBatchHeight() view public returns(uint64) {
        return batchHeight;
    }

    function getBatchTxRoot(uint64 h) view public returns(bytes32) {
        return txhash[h];
    }
    function getBatchSigTxRoot(uint64 h) view public returns(bytes32) {
        return sighash[h];
    }

    function enqueue(QueuedTransaction memory queuetx) public {
        if (uint32(queuetx.to) > 0 && uint32(queuetx.from) > 0) txqueue.push(queuetx);
        emit newTx();
    }

    function l1Enqueue(QueuedTransaction memory queuetx) public {
        require(isAllowedL1Enqueue(msg.sender));
        txqueue.push(queuetx);
        emit newTx();
    }

    function grabQueue() public returns(QueuedTransaction[] memory){
        QueuedTransaction[] memory tq = txqueue;
        delete txqueue;
        return tq;
    }

    function timer() private {
        uint64 t = uint64(block.timestamp);
        for (uint64 i = latestFinalizedBatch+1; i<=batchHeight;i++) {
            if (t - timestamp[i] >= 7*24*60*60*1000) {
                latestFinalizedBatch = i;
            }
        }
        for (uint64 i = 0; i<upcomingWithdraw.length; i++) {
            if (upcomingWithdraw[i].batch <= latestFinalizedBatch) {
                IL1Bridge(L1Bridge).releaseFund(uint32(upcomingWithdraw[i].amount), upcomingWithdraw[i].from);
            }
        }
    }


    address updaterAddress;


    function update(address l1Bridge) external {
        require(msg.sender == owner);

        L1Bridge = l1Bridge;
    }
}
