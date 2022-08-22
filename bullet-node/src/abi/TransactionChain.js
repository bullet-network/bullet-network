module.exports = [
    {
		"inputs": [
		{
			"internalType": "address",
			"name": "o",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "t",
			"type": "address"
		}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "newTx",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "newWithdraw",
		"type": "event"
	},
	{
		"inputs": [
		{
			"internalType": "bytes19[]",
			"name": "transactions",
			"type": "bytes19[]"
		},
		{
			"components": [
			{
				"internalType": "bytes4",
				"name": "from",
				"type": "bytes4"
			},
			{
				"internalType": "bytes4",
				"name": "amount",
				"type": "bytes4"
			},
			{
				"internalType": "uint64",
				"name": "batch",
				"type": "uint64"
			}
			],
			"internalType": "struct ITransactionChain.Withdraw[]",
			"name": "withdraws",
			"type": "tuple[]"
		},
		{
			"internalType": "bytes[]",
			"name": "sig",
			"type": "bytes[]"
		},
		{
			"internalType": "uint64",
			"name": "height",
			"type": "uint64"
		}
		],
		"name": "appendBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "batchHeight",
		"outputs": [
		{
			"internalType": "uint64",
			"name": "",
			"type": "uint64"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"components": [
			{
				"internalType": "bytes4",
				"name": "to",
				"type": "bytes4"
			},
			{
				"internalType": "bytes4",
				"name": "from",
				"type": "bytes4"
			},
			{
				"internalType": "bytes8",
				"name": "amount",
				"type": "bytes8"
			},
			{
				"internalType": "bytes1",
				"name": "gasprice",
				"type": "bytes1"
			},
			{
				"internalType": "bytes2",
				"name": "nonce",
				"type": "bytes2"
			}
			],
			"internalType": "struct ITransactionChain.QueuedTransaction",
			"name": "queuetx",
			"type": "tuple"
		}
		],
		"name": "enqueue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBatchHeight",
		"outputs": [
		{
			"internalType": "uint64",
			"name": "",
			"type": "uint64"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint64",
			"name": "h",
			"type": "uint64"
		}
		],
		"name": "getBatchSigTxRoot",
		"outputs": [
		{
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint64",
			"name": "h",
			"type": "uint64"
		}
		],
		"name": "getBatchTxRoot",
		"outputs": [
		{
			"internalType": "bytes32",
			"name": "",
			"type": "bytes32"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "grabQueue",
		"outputs": [
		{
			"components": [
			{
				"internalType": "bytes4",
				"name": "to",
				"type": "bytes4"
			},
			{
				"internalType": "bytes4",
				"name": "from",
				"type": "bytes4"
			},
			{
				"internalType": "bytes8",
				"name": "amount",
				"type": "bytes8"
			},
			{
				"internalType": "bytes1",
				"name": "gasprice",
				"type": "bytes1"
			},
			{
				"internalType": "bytes2",
				"name": "nonce",
				"type": "bytes2"
			}
			],
			"internalType": "struct ITransactionChain.QueuedTransaction[]",
			"name": "",
			"type": "tuple[]"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "addr",
			"type": "address"
		}
		],
		"name": "isAllowedBatch",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "addr",
			"type": "address"
		}
		],
		"name": "isAllowedL1Enqueue",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"components": [
			{
				"internalType": "bytes4",
				"name": "to",
				"type": "bytes4"
			},
			{
				"internalType": "bytes4",
				"name": "from",
				"type": "bytes4"
			},
			{
				"internalType": "bytes8",
				"name": "amount",
				"type": "bytes8"
			},
			{
				"internalType": "bytes1",
				"name": "gasprice",
				"type": "bytes1"
			},
			{
				"internalType": "bytes2",
				"name": "nonce",
				"type": "bytes2"
			}
			],
			"internalType": "struct ITransactionChain.QueuedTransaction",
			"name": "queuetx",
			"type": "tuple"
		}
		],
		"name": "l1Enqueue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "latestFinalizedBatch",
		"outputs": [
		{
			"internalType": "uint64",
			"name": "",
			"type": "uint64"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
		],
		"name": "txqueue",
		"outputs": [
		{
			"internalType": "bytes4",
			"name": "to",
			"type": "bytes4"
		},
		{
			"internalType": "bytes4",
			"name": "from",
			"type": "bytes4"
		},
		{
			"internalType": "bytes8",
			"name": "amount",
			"type": "bytes8"
		},
		{
			"internalType": "bytes1",
			"name": "gasprice",
			"type": "bytes1"
		},
		{
			"internalType": "bytes2",
			"name": "nonce",
			"type": "bytes2"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
		],
		"name": "upcomingWithdraw",
		"outputs": [
		{
			"internalType": "bytes4",
			"name": "from",
			"type": "bytes4"
		},
		{
			"internalType": "bytes4",
			"name": "amount",
			"type": "bytes4"
		},
		{
			"internalType": "uint64",
			"name": "batch",
			"type": "uint64"
		}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "l1Bridge",
			"type": "address"
		}
		],
		"name": "update",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address[]",
			"name": "batchaddr",
			"type": "address[]"
		},
		{
			"internalType": "address[]",
			"name": "queueaddr",
			"type": "address[]"
		}
		],
		"name": "updateAllow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint64",
			"name": "h",
			"type": "uint64"
		}
		],
		"name": "updateDispute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
	]