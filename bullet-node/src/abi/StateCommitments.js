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
        "name": "deployer",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "stateRoot",
        "type": "bytes32"
      }
    ],
    "name": "appendState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "batchHeight",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
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
    "name": "getBatchStateRoot",
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
    "name": "getBatchStateSubmitter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "proverAddress",
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
        "internalType": "uint64",
        "name": "height",
        "type": "uint64"
      },
      {
        "internalType": "bytes32",
        "name": "root",
        "type": "bytes32"
      }
    ],
    "name": "updateProvenState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
