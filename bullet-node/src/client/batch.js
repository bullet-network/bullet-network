const { ethers } = require("ethers");

async function addBatch(chainInfo, transactionChain, stateCommitments, batchDB) {
    const batch = chainInfo.transactionPool.splice(0, 50);

    chainInfo.blockHeight++;

    const withdrawTxList = (await transactionChain.txqueue()).slice(0, 50);

    const sigList = [];

    for (const tx of batch) {
        sigList.push(await sigDB.get(tx));
    }

    await transactionChain.appendBatch(batch, withdrawTxList, sigList, chainInfo.blockHeight);

    await stateCommitments.appendState();

    await batchDB.put(chainInfo.blockHeight, batch);
}

function loopAddBatch(transactionPool, transactionChain, batchDB, time = 600000) {
    setInterval(async () => await addBatch(transactionPool, transactionChain, stateCommitments, batchDB), time);
}

module.exports = { addBatch, loopAddBatch };
