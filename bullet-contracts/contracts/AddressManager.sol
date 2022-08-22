// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;


import { IAddressManager } from "./interfaces/IAddressManager.sol";

contract AddressManager is IAddressManager {
    uint32 id = 0;
    mapping(address => bool) allowed;
    mapping(address => uint32) addressList;
    mapping(uint32 => address) reverseAddressList;
    address owner;
    constructor(address o) {
        owner = o;
    }
    function updateAllow(address[] memory addr) external {
        require(msg.sender == owner);
        for (uint64 i = 0; i<addr.length; i++) {
            allowed[addr[i]] = true;
        }
    }

    function isAllowed(address addr) view private returns(bool){
        if (allowed[addr]) {
            return true;
        }
        
        return false;
    }
    
    function add(address addr) external {
        require(isAllowed(msg.sender));
        
        unchecked {
            id++; // Unchecked because id can't go over 2^32
        }
        
        addressList[addr] = id;
        reverseAddressList[id] = addr;
    }
    
    function contain(address addr) view public returns(bool) {
        if (addressList[addr] > 0) {
            return true;
        }

        return false;
    }
    
    function get(address addr) view public returns(uint32) {
        return addressList[addr];
    }
    
    function getAddr(uint32 index) view public returns(address) {
        return reverseAddressList[index];
    }



    function update(address bridgeAddress) external {
        require(msg.sender == owner);

        allowed[bridgeAddress] = true;
    }
}
