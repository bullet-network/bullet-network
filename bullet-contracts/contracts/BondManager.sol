// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;


import { IBondManager } from "./interfaces/IBondManager.sol";

contract BondManager is IBondManager {
    mapping(address => bool) allowed;
    mapping(address => uint) bonds;
    // Note : if deployed on Ethereum Mainnet, change to 8 (ETH), if deployed on Polygon, keep it at 1600 (MATIC)
    uint128 private minimalBondAmount = 1600000000000000000000;

    function isAllowed(address addr) view private returns(bool){
        if (allowed[addr]) {
            return true;
        }
        return false;
    }

    function bonded(address addr) view public returns(bool){
        if (bonds[addr] > 0) {
            return true;
        }
        return false;
    }

    function deleteBond(address addr) external {
        require(bonded(addr));
        require(isAllowed(msg.sender));
        bonds[addr] = 0;
    }
    
    function bond(uint128 amount) external payable {
        require(msg.value == amount);
        require(amount >= minimalBondAmount);
        bonds[msg.sender] = amount;
    }

    address updaterAddress;

    constructor(address deployer) {
        updaterAddress = deployer;
    }

    function update(address proverAddress, address stateCommitmentAddress) external {
        require(msg.sender == updaterAddress);

        allowed[proverAddress] = true;
        allowed[stateCommitmentAddress] = true;

        delete updaterAddress;
    }
}
