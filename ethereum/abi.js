module.exports = [
    {
      "inputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x70a08231"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "register",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x1aa3a008"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "unregister",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x2ec2c246"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "toAirline",
          "type": "address"
        }
      ],
      "name": "settlePayment",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x2109dc88"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "toAirline",
          "type": "address"
        },
        {
          "name": "orderHash",
          "type": "uint256"
        }
      ],
      "name": "request",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xc8c01a55"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "fromAirline",
          "type": "address"
        },
        {
          "name": "orderHash",
          "type": "uint256"
        }
      ],
      "name": "response",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x3ef9e3e4"
    }
  ]