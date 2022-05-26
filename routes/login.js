const express = require("express");
const Jwt = require("jsonwebtoken");
const fs = require("fs");
const router = express.Router();
const Model = require("../models/model");

var secrete = fs.readFileSync("routes/secrete.key");

router.post("/api/user", verifytoken, (req, res) => {
  Jwt.verify(req.token, secrete, (err, data) => {
    if (err) res.sendStatus(403);
    else {
      res.json({msg:"logged in successfully"})
    }
  });
});

router.post("/login", (req, res) => {
  Jwt.sign({ Model }, secrete, async (err, token) => {
    if (!req.body.username || !req.body.password) {
      res.json({ message: "please enter username and password" });
    } else {
      try {
        const data = await Model.find({
          username: req.body.username,
          password: req.body.password,
        });
        if (data != "") {
          res.json({ data, token });
        } else {
          res.json({ message: "username or password is incorrect" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  });
});

function verifytoken(req, res, next) {
  //format of token => authorization: Bearer<token>
  const bearerheader = req.headers["authorization"];
  if (typeof bearerheader !== "undefined") {
    //split token
    const bearer = bearerheader.split(" ");
    //get token from array
    const token = bearer[1];
    //set the token
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

exports.verifytoken = verifytoken;

module.exports = router;
