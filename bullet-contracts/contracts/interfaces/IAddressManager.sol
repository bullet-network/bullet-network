// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;


interface IAddressManager {
    function add(address addr) external;
    function contain(address addr) view external returns(bool);
    function get(address addr) view external returns(uint32);
    function getAddr(uint32 index) view external returns(address);
    function updateAllow(address[] memory addr) external;
}