const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const utils = require('../utils.js');
const config = require("../config.json");
const backend = require("../backend/" + config.backend)

router.post('/configure', (req, res, next) => {
  var cmdObj = backend.dockerConfigure;

  cmdObj.arguments.cmd = config.cmd;
  cmdObj.arguments.email = config.email;
  cmdObj.arguments.repo = config.repo;
  cmdObj.arguments.token = config.token;

  var command = utils.createCommand(cmdObj);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.json({
        "error": error.message
      });
      return;
    }
    if (stderr) {
      res.json({
        "error": stderr
      });
      return;
    }
    res
    .status(200)
    .json({
      "response": "Dockerfile configured ..."
    });
  });
});

module.exports = router;
