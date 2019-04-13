module.exports = [
  {
    inputs: [],
    payable: true,
    stateMutability: "payable",
    type: "constructor",
    signature: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "event_id",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "db_type",
        type: "bytes32"
      },
      {
        indexed: false,
        name: "record",
        type: "string"
      }
    ],
    name: "AddedRecord",
    type: "event",
    signature:
      "0xae537f43da1005ff59eb7daa9d102d12d89879cb4a52284e45da3880872de05a"
  },
  {
    constant: false,
    inputs: [
      {
        name: "unique_id",
        type: "bytes32"
      },
      {
        name: "db_name",
        type: "bytes32"
      },
      {
        name: "record",
        type: "string"
      }
    ],
    name: "addRecord",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x23c3b146"
  }
];
