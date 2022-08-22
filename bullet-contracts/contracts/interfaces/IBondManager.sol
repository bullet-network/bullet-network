// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;


interface IBondManager {
    function bonded(address addr) view external returns(bool);
    function deleteBond(address addr) external;
    function bond(uint128 amount) external payable;
}