module.exports = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "text",
        type: "bytes32"
      }
    ],
    name: "AddedRecord",
    type: "event",
    signature:
      "0x7dfc57a9525538776c977cb1e9851c5be5b9e0a6bafd9fbf3ca94ee6d4dd42e2"
  },
  {
    constant: false,
    inputs: [
      {
        name: "bar",
        type: "bytes32"
      }
    ],
    name: "addRecord",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x571a1d73"
  }
];
