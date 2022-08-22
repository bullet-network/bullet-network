async function challengeFalseState(batchHeight, currentBatchHeight, prover, stateDB, batchDB) {
    const batch = await batchDB.get(batchHeight);

    const nextBatches = [];

    for (let batchIndex = batchHeight+1; batchIndex <= currentBatchHeight; batchIndex++) {
        nextBatches.push(await batchDB.get(batchIndex));
    }

    const rawState = [];

    const addressList = await stateDB.keys().all();

    for (const address of addressList) {
        const state = await stateDB.get(address);

        rawState.push(address + state.balance.toString(16) + state.nonce.toString(16));
    }

    await prover.challenge(rawState, batch, batchHeight, nextBatches);
}

async function challengeFalseSigs(batchHeight, batchChallenge, sigDB, batchDB) {
    const disputedtx = await batchDB.get(batchHeight);

    const vs = [], rs = [], ss = [];

    for (const tx of disputedtx) {
        const sig = await sigDB.get(tx);

        rs.push("0x" + sig.slice(0, 66));
        ss.push("0x" + sig.slice(66, 130));
        vs.push(parseInt(sig.slice(130, 132), 16));
    }

    await batchChallenge.challenge(vs, rs, ss, disputedtx, batchHeight);
}

module.exports = { challengeFalseState, challengeFalseSigs };
