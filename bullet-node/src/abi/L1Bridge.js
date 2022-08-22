module.exports = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addressManager",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_transactionChain",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "o",
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
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "Bridge",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "a",
        "type": "uint32"
      }
    ],
    "name": "bridge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "amount",
        "type": "uint32"
      },
      {
        "internalType": "bytes4",
        "name": "from",
        "type": "bytes4"
      }
    ],
    "name": "releaseFund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "addr",
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
        "internalType": "uint8",
        "name": "amount",
        "type": "uint8"
      }
    ],
    "name": "updateGas",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "a",
        "type": "uint32"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]