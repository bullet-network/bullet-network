// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface IStateCommitments {
    function appendState(bytes32 stateRoot) external;
    function getBatchStateRoot(uint64 h) view external returns(bytes32);
    function getBatchStateSubmitter(uint64 h) view external returns(address);
    function updateProvenState(uint64 height, bytes32 root) external;
}