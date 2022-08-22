const axios = require("axios");
const ethers = require("ethers");
const { decodeTransaction, encodeTransaction } = require("../utils/utils");

async function sendTransaction(tx, sequencerURL) { // Used to send transactions to sequencer
    let success = false;
    
    await axios.post(sequencerURL, {
        params: {
            method: "send_transaction",
            tx
        }
    })
    .then(function (response) {
        success = response.body.success;
    })
    .catch(function (error) {
        console.log("LOG :: Error sending transaction:", error);
        success = false;
    });

    return success;
}

async function transactionHandler(tx, sequencerURL, sig, stateDB, sigDB, addressManager, transactionPool) { // Used by sequencer to handle transactions
    const decodedTx = decodeTransaction(tx);

    if (!(await stateDB.keys().all()).includes(decodedTx.from)) return false;
    
    const senderState = await stateDB.get(decodedTx.from);

    let coinSpentInPool = 0;

    for (const tx of transactionPool) {
        const decodedPoolTx = decodeTransaction(tx);
        
        coinSpentInPool += decodedPoolTx.amount + decodedTx.gasPrice * 3000;
    }

    if (
        senderState.balance >= decodedTx.amount + decodedTx.gasPrice * 3000 + coinSpentInPool &&
        ethers.utils.recoverAddress(ethers.utils.arrayify(tx), sig) === (await addressManager.getAddr(decodedTx.from)) &&
        !senderState.nonces.includes(decodedTx.nonce) &&
        !transactionPool.map(tx => decodeTransaction(tx).nonce).includes(decodedTx.nonce)
    ) {
        return false;
    }

    transactionPool.append(tx);

    await sigDB.put(tx, sig);

    return true;
}

async function deposit(amount, l1Bridge) { // Deposit from L1 to L2
    await l1Bridge.bridge(amount);
}

async function withdraw(amount, l1Bridge) { // Withdraw from L2 to L1
    await l1Bridge.withdraw(amount);
}


module.exports = { sendTransaction, transactionHandler, deposit, withdraw };
