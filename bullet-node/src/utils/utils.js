function decodeTransaction(rawTxData) {
    const txObj = {
        from:     rawTxData.substr(0, 8),
        to:       rawTxData.substr(8, 8),
        amount:   BigInt("0x" + rawTxData.substr(16, 16)),
        gasPrice: parseInt(rawTxData.substr(32, 2), 16),
        nonce:    parseInt(rawTxData.substr(34, 4), 16)
    };

    return txObj;
}

function encodeTransaction(tx) {
    return tx.from + tx.to + tx.amount.toString(16) + tx.gasPrice.toString(16) + tx.nonce.toString(16);
}

function isNumber(str) {
    return str.split("").every(char => "0123456789".includes(char));
}

module.exports = { decodeTransaction, encodeTransaction, isNumber };
