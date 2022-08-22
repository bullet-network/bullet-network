const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    
    console.log("Deployer address:", deployer.address);


    const AddressManager = await ethers.getContractFactory("AddressManager");
    const addressManager = await AddressManager.deploy(deployer.address);

    await addressManager.deployed();

    console.log(`AddressManager deployed to:`, addressManager.address);



    const BondManager = await ethers.getContractFactory("BondManager");
    const bondManager = await BondManager.deploy(deployer.address);

    await bondManager.deployed();

    console.log(`BondManager deployed to:`, bondManager.address);



    const TransactionChain = await ethers.getContractFactory("TransactionChain");
    const transactionChain = await TransactionChain.deploy(deployer.address, deployer.address);

    await transactionChain.deployed();

    console.log(`TransactionChain deployed to:`, transactionChain.address);



    const L1Bridge = await ethers.getContractFactory("L1Bridge");
    const l1Bridge = await L1Bridge.deploy(addressManager.address, transactionChain.address, '0x0000000000000000000000000000000000000000');

    await l1Bridge.deployed();

    console.log(`L1Bridge deployed to:`, l1Bridge.address);

    await transactionChain.update(l1Bridge.address);

    console.log(`TransactionChain connected to L1Bridge`);

    await addressManager.update(l1Bridge.address);

    console.log(`AddressManager connected to L1Bridge`);



    const StateCommitments = await ethers.getContractFactory("StateCommitments");
    const stateCommitments = await StateCommitments.deploy(bondManager.address, transactionChain.address, deployer.address);

    await stateCommitments.deployed();

    console.log(`StateCommitments deployed to:`, stateCommitments.address);



    const Prover = await ethers.getContractFactory("Prover");
    const prover = await Prover.deploy(bondManager.address, transactionChain.address, stateCommitments.address);

    await prover.deployed();

    console.log(`Prover deployed to:`, prover.address);

    await stateCommitments.update(prover.address);

    console.log(`StateCommitments connected to Prover`);

    
    
    const BatchChallenge = await ethers.getContractFactory("BatchChallenge");
    const batchChallenge = await BatchChallenge.deploy(bondManager.address, transactionChain.address, stateCommitments.address, deployer.address);

    await batchChallenge.deployed();

    console.log(`BatchChallenge deployed to:`, batchChallenge.address);


    
    await bondManager.update(prover.address, stateCommitments.address);

    console.log(`BondManager connected to Prover and StateCommitments`);
}

main();
