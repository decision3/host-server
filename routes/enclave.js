const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const utils = require('../utils.js');
const config = require("../config.json");
const backend = require("../backend/" + config.backend)
const enclave_path = './enclave/'+config.backend+"/";

router.post('/configure', (req, res, next) => {
  var cmdObj = backend.dockerConfigure;

  cmdObj.arguments.cmd = config.cmd;
  cmdObj.arguments.email = config.email;
  cmdObj.arguments.repo = config.repo;
  cmdObj.arguments.token = config.token;

  var command = enclave_path + utils.createCommand(cmdObj);
  
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
      "response": "Dockerfile configured"
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
      "response": "Generated docker image"
    });
  });
});

router.post('/build', (req, res, next) => {
  var cmdObj = backend.enclaveBuild;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    
    console.log(error, stdout, stderr);
    res.json({"response": "ok"});

    if (stdout) {
      if (!stderr) {
        res
        .status(200)
        .json({
          "response": "Generated enclave image"
        });
        return;
      } else {
        res
        .status(500)
        .json({
          "error": stderr
        });
        return;
      }
    }
  });
});

router.post('/run', (req, res, next) => {
  var cmdObj = backend.enclaveRun;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      if (!stderr) {
        res
        .status(200)
        .json({
          "response": "Running enclave"
        });
        return;
      } else {
        res
        .status(500)
        .json({
          "error": stderr
        });
        return;
      }
    }
  });
});

router.post('/terminate', (req, res, next) => {
  var cmdObj = backend.enclaveTerminate;
  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (stdout) {
      if (!stderr) {
        res
        .status(200)
        .json({
          "response": "Terminated enclave"
        });
        return;
      } else {
        res
        .status(500)
        .json({
          "error": stderr
        });
        return;
      }
    }
  });
});

module.exports = router;
