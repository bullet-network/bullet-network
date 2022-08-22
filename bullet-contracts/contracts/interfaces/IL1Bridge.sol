// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface IL1Bridge {
    function bridge(uint32 amount) external payable;
    function releaseFund(uint32 amount, bytes4 from) external;
    function withdraw(uint32 amount) external;
    function updateGas(uint8 amount) external;
    function updateAllow(address[] memory addr) external;
}