const web3 = require("./ethereum/web3Connect");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  require("dotenv").config();
}

// connect to db
const dbURL = process.env.DB_URL;

require("./rest_api/models/db_connect")(dbURL);

const Mortgage = require("./rest_api/models/Mortgage");
const Judgement = require("./rest_api/models/Judgement");
const Tax = require("./rest_api/models/Tax");
const Title = require("./rest_api/models/Title");

const addDataToBC = async (record, db_name) => {
  try {
    const createContract = require("./ethereum/contract");

    const contract = createContract(process.env.CONTRACT_ADDRESS);
    let estimate = await contract.methods
      .addRecord(record[0], web3.utils.asciiToHex(db_name), record[1])
      .estimateGas();

    putData = await contract.methods
      .addRecord(record[0], web3.utils.asciiToHex(db_name), record[1])
      .send({
        from: process.env.ADMIN_ADDRESS,
        gas: 500000
      });
    console.debug(estimate, putData);
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  // const mortgages = await Mortgage.find();
  // const judgements = await Judgement.find();
  // const taxes = await Tax.find();
  // const titles = await Title.find();
  // for (let index = 0; index < mortgages.length; index++) {
  //   const { owner, mortgage_amount, current_balance, status } = mortgages[
  //     index
  //   ];
  //   const record = [
  //     web3.utils.asciiToHex(`${owner}`),
  //     `~${mortgage_amount}~${current_balance}~${status}~`
  //   ];
  //   addDataToBC(record, "mortgages");
  // }
  // for (let index = 0; index < judgements.length; index++) {
  //   const {
  //     owner,
  //     case_number,
  //     judgement_description,
  //     judgement_file_state,
  //     amount
  //   } = judgements[index];
  //   const record = [
  //     web3.utils.asciiToHex(`${owner}`),
  //     `~${case_number}~${judgement_description}~${judgement_file_state}~${amount}~`
  //   ];
  //   addDataToBC(record, "judgements");
  // }
  // for (let index = 0; index < titles.length; index++) {
  //   const { seller, buyer, date, transaction_type, price } = titles[index];
  //   const record = [
  //     web3.utils.asciiToHex(`${seller}`),
  //     `~${buyer}~${date}~${transaction_type}~${price}~`
  //   ];
  //   addDataToBC(record, "titles");
  // }
  // for (let index = 0; index < taxes.length; index++) {
  //   const { owner, tax_year, taxes_received, amount } = taxes[index];
  //   const record = [
  //     web3.utils.asciiToHex(`${owner}`),
  //     `~${tax_year}~${taxes_received}~${amount}~`
  //   ];
  //   addDataToBC(record, "taxes");
  // }

  // vignette #2: use tx hash
  // const txHash =
  //   "0xd1c75a975cc77256da979e256a05d6ebe26a9f69df15b42c07cba5c294970299";
  // const trx = await web3.eth.getTransaction(txHash);
  // console.log(web3.utils.hexToUtf8(trx.input));
  //vignette #3: get all events for the contract
  // TODO: web sockets not working
  // const Web3_events = require("web3");
  // const web3_events = new Web3_events(
  //   new Web3_events.providers.HttpProvider(
  //
  //     "ws://localhost:7545"
  //   )
  // );
  // const abi = require("./ethereum/abi");
  // const contract_events = new web3_events.eth.Contract(
  //   abi,
  //   process.env.CONTRACT_ADDRESS
  // );
  // console.log(
  //   contract.events.AddedRecord({}, { fromBlock: 0, toBlock: "latest" })
  // );
  // contract.events
  //   .AddedRecord({}, { fromBlock: 0, toBlock: "latest" })
  //   .watch((error, eventResult) => {
  //     if (error) console.log("Error in myEvent event handler: " + error);
  //     else console.log("myEvent: " + JSON.stringify(eventResult.args));
  //   });
  // contract.events
  //   .AddedRecord({ fromBlock: 0, toBlock: "latest" }, (error, eventResult) => {
  //     if (error) console.log("Error in myEvent event handler: " + error);
  //     else console.log("myEvent: " + JSON.stringify(eventResult.args));
  //   })
  //   .on("data", event => {
  //     console.log(event); // same results as the optional callback above
  //   });
  const createContract = require("./ethereum/contract");
  const contract = createContract(process.env.CONTRACT_ADDRESS);
  console.debug(web3.utils.asciiToHex("Victor Stachura"));
  contract.getPastEvents(
    "AddedRecord",
    {
      fromBlock: 1300,
      toBlock: "latest",
      filter: {
        event_id: web3.utils.asciiToHex("Charles Fink"),
        db_type: web3.utils.asciiToHex("taxes")
      }
    },
    (err, result) => {
      console.debug(err, result);
    }
  );
})();
