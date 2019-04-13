const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const { signTx } = require("../helpers");
const CryptoJS = require("crypto-js");

module.exports = function(contract) {
  // called when signup post request is made
  async function signupFunction(req, res, next) {
    const { accountAddress, email, password, privateKey } = req.body;

    // check if the user exists
    let matchedDoc;
    try {
      matchedDoc = await User.findOne({ email });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Network error, try again" });
    }

    if (!matchedDoc) {
      let hash;
      try {
        const salt = await bcrypt.genSalt(14);

        hash = await bcrypt.hash(password, salt);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "Signup failed. Malformed password. Try again." });
      }

      try {
        console.debug(`Calling register with ${accountAddress}`);

        const encryptedPk = CryptoJS.AES.encrypt(
          privateKey,
          password
        ).toString();

        const receipt = await signTx(
          accountAddress,
          process.env.CONTRACT_ADDRESS,
          privateKey,
          contract.methods.register().encodeABI()
        );

        if (receipt) {
          let savedUser;

          const newUser = new User({
            bcAddress: accountAddress,
            email,
            password: hash,
            isAdmin: false,
            accountBalance: process.env.SIGNUP_BONUS,
            encryptedPk
          });
          try {
            savedUser = await newUser.save();
          } catch (err) {
            console.error(err);
            return res
              .status(401)
              .json({ message: "Signup failed. Try again" });
          }
          res.status(200).json({ message: "Signup success!", user: savedUser });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Blockchain error. Try again" });
      }
    } else {
      res
        .status(401)
        .send({ message: "Account with this email already exists" });
    }
  }

  // called when login post request
  async function loginFunction(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    let userDoc;
    try {
      userDoc = await User.findOne({ email });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Network error. Try again." });
    }

    if (userDoc) {
      const result = await bcrypt.compare(password, userDoc.password);

      if (result) {
        return res
          .status(200)
          .json({ message: "Login Success", user: userDoc });
      }
      res.status(401).json({ message: "Email or password is incorrect" });
    } else {
      res
        .status(401)
        .json({ message: "Your account does not exist, please register" });
    }
  }

  authRouter.route("/signup").post(signupFunction);

  authRouter.route("/login").post(loginFunction);

  return authRouter;
};
