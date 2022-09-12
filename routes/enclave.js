const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const utils = require('../utils.js');
var config = require("../config.json");
const enclave_path = './enclave/'+config.backend+"/";
var backend = null;

switch (config.backend) {
  case "nitro":
    backend = require("../backends/nitro");
    break;
  default:
    console.log("Invalid backend");
    process.exit(128);
    break;
}

router.post('/configure', (req, res, next) => {

  var cmdObj = backend.dockerConfigure;

  config = req.body;

  cmdObj.arguments.cmd = config.cmd;
  cmdObj.arguments.email = config.email;
  cmdObj.arguments.repo = config.repo;
  cmdObj.arguments.token = config.token;

  var command = enclave_path + utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      res
      .status(500)
      .json({
        "error": error.message
      });
      return;
    }
    if (stderr) {
      console.log(stderr);
      res
      .status(500)
      .json({
        "error": stderr
      });
      return;
    }
    res
    .status(200)
    .json({
      "response": "Oracle configured"
    });
  });
});

router.post('/image', (req, res, next) => {
  var cmdObj = backend.dockerBuild;
  cmdObj.arguments.file = enclave_path + 'Dockerfile';

  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      res
      .status(500)
      .json({
        "error": error.message
      });
      return;
    }
    if (stderr) {
      res
      .status(500)
      .json({
        "error": stderr
      });
      return;
    }
    res
    .status(200)
    .json({
      "response": "Oracle image created"
    });
  });
});

router.post('/build', (req, res, next) => {
  var cmdObj = backend.enclaveBuild;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    // console.log("PCR registers: ", stdout);
    if (stdout) {
      res
      .status(200)
      .json({
        "response": "Oracle deployed",
        "PCR": stdout
      });
      return;
    }
  });
});

router.post('/run', (req, res, next) => {
  var cmdObj = backend.enclaveRun;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      res
      .status(200)
      .json({
        "response": "Oracle running"
      });
      return;
    }
  });
});

router.get('/', (req, res, next) => {
  var cmdObj = backend.enclaveId;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      res
      .status(200)
      .json({
        "response": stdout.trim()
      });
      return;
    }
  });
});

router.post('/terminate', (req, res, next) => {
  var cmdObj = backend.enclaveTerminate;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      res
      .status(200)
      .json({
        "response": "Oracle terminated"
      });
      return;
    }
  });
});

router.post('/attest', (req, res, next) => {
  res
  .status(200)
  .json({
    "response": "attested"
  });
  return;
});

module.exports = router;
