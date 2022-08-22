// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface ITransactionChain {
    struct QueuedTransaction {
        bytes4 to;
        bytes4 from;
        bytes8 amount;
        bytes1 gasprice;
        bytes2 nonce;
    }
    struct Withdraw {
        bytes4 from;
        bytes4 amount;
        uint64 batch;
    }
    function appendBatch(bytes19[] calldata transactions, Withdraw[] calldata withdraws, bytes[] memory sig, uint64 height) external;
    function getBatchHeight() view external returns(uint64);
    function getBatchTxRoot(uint64 h) view external returns(bytes32);
    function getBatchSigTxRoot(uint64 h) view external returns(bytes32);
    function enqueue(QueuedTransaction calldata queuetx) external;
    function l1Enqueue(QueuedTransaction calldata queuetx) external;
    function grabQueue() external returns(QueuedTransaction[] memory);
    function isAllowedBatch(address addr) external returns(bool);
    function isAllowedL1Enqueue(address addr) external returns(bool);
    function updateAllow(address[] memory batchaddr, address[] memory queueaddr) external;
    function updateDispute(uint64 h) external;
}