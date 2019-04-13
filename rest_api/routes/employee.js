const express = require("express");
const employeeRouter = express.Router();
const Mortgage = require("../models/Mortgage");
const bcrypt = require("bcryptjs");
const createContract = require("../../ethereum/contract");
const web3 = require("../../ethereum/web3Connect");
const contract = createContract(process.env.CONTRACT_ADDRESS);
const BuyerRecord = require("../models/BuyerRecord");
const axios = require("axios");

module.exports = function(contract) {
  // TODO: protect this route
  async function getTaxes(ownerName) {
    console.debug(web3.utils.asciiToHex(ownerName));

    try {
      const getEvents = await contract.getPastEvents("AddedRecord", {
        // remove hard coded block number
        fromBlock: 1300,
        toBlock: "latest",
        filter: {
          event_id: web3.utils.asciiToHex(ownerName),
          db_type: web3.utils.asciiToHex("taxes")
        }
      });
      // console.debug(getEvents);
      if (getEvents) {
        const data = getEvents.map(record => record.returnValues[2]);
        console.debug(data);
        return data;
      } else {
        return "error";
      }
    } catch (err) {
      console.error(err);
      return "unknown error";
    }
  }

  async function getMortgages(ownerName) {
    console.debug(web3.utils.asciiToHex(ownerName));

    try {
      const getEvents = await contract.getPastEvents("AddedRecord", {
        // remove hard coded block number
        fromBlock: 1300,
        toBlock: "latest",
        filter: {
          event_id: web3.utils.asciiToHex(ownerName),
          db_type: web3.utils.asciiToHex("mortgages")
        }
      });
      console.debug(getEvents);
      if (getEvents) {
        return getEvents[0].returnValues[2];
      } else {
        return "error";
      }
    } catch (err) {
      console.error(err);
      return "unknown error";
    }
  }

  async function getJudgements(ownerName) {
    console.debug(web3.utils.asciiToHex(ownerName));

    try {
      const getEvents = await contract.getPastEvents("AddedRecord", {
        // remove hard coded block number
        fromBlock: 1300,
        toBlock: "latest",
        filter: {
          event_id: web3.utils.asciiToHex(ownerName),
          db_type: web3.utils.asciiToHex("judgements")
        }
      });
      console.debug(getEvents);
      if (getEvents) {
        return getEvents[0].returnValues[2];
      } else {
        return "Unauthorized";
      }
    } catch (err) {
      console.error(err);
      return "unknown error";
    }
  }

  async function getTitles(sellerName) {
    console.debug(web3.utils.asciiToHex(sellerName));

    try {
      const getEvents = await contract.getPastEvents("AddedRecord", {
        // remove hard coded block number
        fromBlock: 1300,
        toBlock: "latest",
        filter: {
          event_id: web3.utils.asciiToHex(sellerName),
          db_type: web3.utils.asciiToHex("titles")
        }
      });
      console.debug(getEvents);
      if (getEvents) {
        return getEvents[0].returnValues[2];
      } else {
        return "Unauthorized";
      }
    } catch (err) {
      console.error(err);
      return "unknown error";
    }
  }

  async function getBuyerRecords(req, res, next) {
    try {
      const records = await BuyerRecord.find({});
      console.debug(records);
      if (records) {
        res.status(200).json({
          data: records
        });
      } else {
        res.status(500).json({ message: "unknown error" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "unknown error" });
    }
  }

  async function getStatus(req, res, next) {
    const { ownerName } = req.body;
    const taxData = await getTaxes(ownerName);
    // const titleData = getTitles(ownerName);
    // const mortgageData = getMortgages(ownerName);
    // const judgementData = getJudgements(ownerName);
    // TODO: check if owner is a buyer in the last record in title database
    // TODO: check if owner doesnt have cases against him in judgement database
    // TODO: check if mortgage against the owner
    taxData.map(record => {
      const bool = record.split("~")[2];
      if (bool == "Y") {
        return res.status(200).json({ status: "Approved" });
      } else {
        return res.status(200).json({ status: "Not Approved" });
      }
    });

    // console.log(td, "td");
    // res.status(200).json({ taxes: taxData });
  }

  // employeeRouter.route("/get_taxes").post(getTaxes);
  // employeeRouter.route("/get_titles").post(getTitles);
  // employeeRouter.route("/get_mortgages").post(getMortgages);
  // employeeRouter.route("/get_judgements").post(getJudgements);
  employeeRouter.route("/getBuyerRecords").get(getBuyerRecords);

  employeeRouter.route("/getStatus").post(getStatus);

  return employeeRouter;
};
