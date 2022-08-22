// Import all the libraries
const ethers = require("ethers");
const { Level } = require('level');

// Import all the local packages
const { decodeTransaction, encodeTransaction } = require("../utils/utils");
const { sendTransaction, transactionHandler, deposit, withdraw } = require("./transaction-handler");
const { transistState } = require("./state");
const { loopAddBatch } = require("./batch");

// Init stuff
const stateDB = new Level(__dirname + "/../log/stateStore", { valueEncoding: "json" });
const sigDB = new Level(__dirname + "/../log/sigStore", { valueEncoding: "json" });
const batchDB = new Level(__dirname + "/../log/batchStore", { valueEncoding: "json" });

const { Contract } = ethers;

const addressManagerABI = require("../abi/AddressManager");
const bondManagerABI = require("../abi/BondManager");
const l1BridgeABI = require("../abi/L1Bridge");
const proverABI = require("../abi/Prover");
const stateCommitmentsABI = require("../abi/StateCommitments");
const transactionChainABI = require("../abi/TransactionChain");
const batchChallengeABI = require("../abi/BatchChallenge");

const {
    addressManagerAddress,
    bondManagerAddress,
    l1BridgeAddress,
    proverAddress,
    stateCommitmentsAddress,
    transactionChainAddress,
    batchChallengeAddress,
    sequencerURL,
    sequencerAddress,
    startSyncBlockNumber,
    jsonrpcurl
} = require("../../config.json");


const jsonRPCProvider =  new ethers.providers.JsonRpcProvider(jsonrpcurl);
const signer = jsonRPCProvider.getSigner();

const addressManager = new Contract(addressManagerAddress, addressManagerABI, signer);
const bondManager = new Contract(bondManagerAddress, bondManagerABI, signer);
const l1Bridge = new Contract(l1BridgeAddress, l1BridgeABI, signer);
const prover = new Contract(proverAddress, proverABI, signer);
const stateCommitments = new Contract(stateCommitmentsAddress, stateCommitmentsABI, signer);
const transactionChain = new Contract(transactionChainAddress, transactionChainABI, signer);
const batchChallenge = new Contract(batchChallengeAddress, batchChallengeABI, signer);


const chainInfo = {
    transactionPool: [],
    blockHeight: 0
};

async function startServer(options) {
    const RPC_PORT         = options.RPC_PORT || 2907;                // RPC server's PORT
    const ENABLE_SEQUENCER = options.ENABLE_SEQUENCER ? true : false; // Enable sequencer?
    const ENABLE_VALIDATOR = options.ENABLE_VALIDATOR ? true : false; // Enable sequencer?
    const ENABLE_RPC       = options.ENABLE_RPC ? true : false;       // Enable RPC server?

    // Sync state

    let startIndex = startSyncBlockNumber;

    while (startIndex < await signer.getBlockNumber()) {
        const block = await signer.getBlockNumber(startIndex);

        for (const tx of block.transactions) {
            if (tx.from === sequencerAddress) {
                try {
                    const interface = new ethers.Interface("function appendBatch(bytes19[] calldata transactions, Withdraw[] calldata withdraws, bytes[] memory sig, uint64 height)");
                    const [ transactions, withdraws, sigs, height ] = interface.decodeFunctionData("appendBatch", tx.data);

                    await transistState(transactions, sequencerAddress, stateDB);
                    await transistState(withdraws, sequencerAddress, stateDB);

                    if (ENABLE_VALIDATOR) {
                        // Fraud proofs are currently disabled.
                    }
                } catch (e) {}
            }
        }
        
        startIndex++;
    }

    if (ENABLE_SEQUENCER) loopAddBatch(chainInfo, transactionChain, stateCommitments, batchDB);
    
    if (ENABLE_RPC) {
        rpc(
            RPC_PORT,
            stateDB,
            sigDB,
            batchDB,
            [addressManager, bondManager, l1Bridge, prover, stateCommitments, transactionChain],
            { address: signer.address, signer, sequencerURL, chainInfo },
            ENABLE_SEQUENCER ? sendTransaction : transactionHandler,
            deposit,
            withdraw
        );
    }
}

module.exports = { startServer };
