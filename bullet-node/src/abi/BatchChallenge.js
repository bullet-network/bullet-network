module.exports = [
    {
        "inputs": [
        {
            "internalType": "address",
            "name": "_bondManagerAddress",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_transactionChainAddress",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "_addressManagerAddress",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "seq",
            "type": "address"
        }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": false,
            "internalType": "uint64",
            "name": "height",
            "type": "uint64"
        }
        ],
        "name": "SequencerSubmitReplacement",
        "type": "event"
    },
    {
        "inputs": [
        {
            "internalType": "uint8[]",
            "name": "vs",
            "type": "uint8[]"
        },
        {
            "internalType": "bytes32[]",
            "name": "rs",
            "type": "bytes32[]"
        },
        {
            "internalType": "bytes32[]",
            "name": "ss",
            "type": "bytes32[]"
        },
        {
            "internalType": "bytes19[]",
            "name": "disputedtx",
            "type": "bytes19[]"
        },
        {
            "internalType": "uint64",
            "name": "height",
            "type": "uint64"
        }
        ],
        "name": "challenge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
