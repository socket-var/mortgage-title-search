const Web3 = require("web3");
const web3 = new Web3(
  // new Web3.providers.HttpProvider(
  //   // TODO: remove short circuit
  //   process.env.BC_HOST_URL || "http://localhost:7545"
  // )
  new Web3.providers.WebsocketProvider(
    // TODO: remove short circuit
    process.env.BC_HOST_URL || "ws://localhost:7545"
  )
);
module.exports = web3;
