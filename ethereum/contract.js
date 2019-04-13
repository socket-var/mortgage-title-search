const web3 = require("./web3Connect");
const abi = require("./abi");

module.exports = function createContract(contractAddress) {
  return new web3.eth.Contract(abi, contractAddress);
};
