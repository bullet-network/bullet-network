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
			"name": "_stateCommitmentAddress",
			"type": "address"
		}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
		{
			"internalType": "bytes10[]",
			"name": "stateSet",
			"type": "bytes10[]"
		},
		{
			"internalType": "bytes19[]",
			"name": "txSet1",
			"type": "bytes19[]"
		},
		{
			"internalType": "uint64",
			"name": "batchHeight",
			"type": "uint64"
		},
		{
			"internalType": "bytes19[][]",
			"name": "postBatchTxSet",
			"type": "bytes19[][]"
		}
		],
		"name": "challenge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "bytes10[]",
			"name": "stateItems",
			"type": "bytes10[]"
		}
		],
		"name": "getRoot10",
		"outputs": [
		{
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
