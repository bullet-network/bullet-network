// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import { ITransactionChain } from "./interfaces/ITransactionChain.sol";
import { IAddressManager } from "./interfaces/IAddressManager.sol";
import { IL1Bridge } from "./interfaces/IL1Bridge.sol";

contract L1Bridge is IL1Bridge {
    address addressManager;
    address transactionChain;

    uint8 currentGas;

    constructor(address _addressManager, address _transactionChain,address o) {
        addressManager = _addressManager;
        transactionChain = _transactionChain;
        owner = o;
    }
    mapping(address => bool) allowed;
    function isAllowed(address addr) view private returns(bool){
        if (allowed[addr]) {
            return true;
        }
        return false;
    }
    address owner;
    function updateAllow(address[] memory addr) external {
        require(msg.sender == owner);
        for (uint64 i = 0; i<addr.length; i++) {
            allowed[addr[i]] = true;
        }
    }

    function updateGas(uint8 amount) external {
        require(isAllowed(msg.sender));
        currentGas = amount;
    }

    ITransactionChain.QueuedTransaction[] bridgetx;


    event Bridge(address user, uint32 amount);

    function bridge(uint32 a) external payable {
        require(msg.value >= a * 1000000000000000000);
        bytes1 b = bytes1(currentGas);
        if (IAddressManager(addressManager).contain(msg.sender)) {
            ITransactionChain.QueuedTransaction memory p = ITransactionChain.QueuedTransaction(0x00000000, bytes4(IAddressManager(addressManager).get(msg.sender)), bytes8(uint64(a*1000000000)), b, 0x0000);
            ITransactionChain(transactionChain).l1Enqueue(p);
            bridgetx.push(p);
        } else {
            IAddressManager(addressManager).add(msg.sender);
            ITransactionChain.QueuedTransaction memory p = ITransactionChain.QueuedTransaction(0x00000000, bytes4(IAddressManager(addressManager).get(msg.sender)), bytes8(uint64(a*1000000000)), b, 0x0000);
            ITransactionChain(transactionChain).l1Enqueue(p);
            bridgetx.push(p);
        }

        emit Bridge(msg.sender, a);
    }


    event Withdraw(address user, uint32 amount);

    function withdraw(uint32 a) external {
        bytes1 b = bytes1(currentGas);
        ITransactionChain.QueuedTransaction memory p = ITransactionChain.QueuedTransaction(bytes4(IAddressManager(addressManager).get(msg.sender)),0x00000000, bytes8(uint64(a*1000000000)), b, 0x0000);
        ITransactionChain(transactionChain).l1Enqueue(p);
        bridgetx.push(p);

        emit Withdraw(msg.sender, a);
    }


    function releaseFund(uint32 amount, bytes4 from) external {
        payable(IAddressManager(addressManager).getAddr(uint32(from))).transfer(amount * 1000000000000000000);
    }
}