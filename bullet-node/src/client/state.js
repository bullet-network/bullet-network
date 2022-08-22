const { decodeTransaction } = require("../utils/utils");

async function transistState(batch, sequencerAddress, stateDB) {
    const existedAddresses = await stateDB.keys().all();

    for (const tx of batch) {
        const decodedTx = decodeTransaction(tx);

        if (!existedAddresses.includes(decodedTx.to)) {
            await stateDB.put(decodedTx.to, {
                balance: "0",
                nonces: []
            });
        }

        const senderState = await stateDB.get(decodedTx.from);
        const recipientState = await stateDB.get(decodedTx.to);
        const sequencerState = await stateDB.get(sequencerAddress);

        const gasPaid = BigInt(decodedTx.gasPrice) * 3000n;

        senderState.balance = (BigInt(senderState.balance) - decodedTx.amount - gasPaid).toString();
        recipientState.balance = (BigInt(recipientState.balance) + decodedTx.amount).toString();
        sequencerState.balance = (BigInt(sequencerState.balance) + sequencerReward).toString();

        senderState.nonces.push(decodedTx.nonce);

        await stateDB.put(decodedTx.from, senderState);
        await stateDB.put(decodedTx.to, recipientState);
        await stateDB.put(sequencerAddress, sequencerState);
    }
}

module.exports = { transistState };
