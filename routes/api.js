const express = require('express');
const { exec } = require("child_process");

const router = express.Router();

router.get('/version', (req, res, next) => {
  exec("nitro-cli --version", (error, stdout, stderr) => {
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
    res.json({
      "version": JSON.stringify(stdout,null,4)
    });
  });
});

router.get('/describe', (req, res, next) => {
  exec("nitro-cli describe-enclaves", (error, stdout, stderr) => {
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
    res.json({
      "description": JSON.stringify(stdout,null,4)
    });
  });
});

router.post('/container', (req, res, next) => {
  exec("docker build /usr/share/nitro_enclaves/examples/hello -t hello", (error, stdout, stderr) => {
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
    res.json({
      "status": "success",
      "response": JSON.stringify(stdout,null,4)
    });
  });
});

router.post('/enclave', (req, res, next) => {
  exec("nitro-cli build-enclave --docker-uri hello:latest --output-file hello.eif", (error, stdout, stderr) => {
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
    res.json({
      "status": "success",
      "response": JSON.stringify(stdout,null,4)
    });
  });
});

router.post('/enclave/run', (req, res, next) => {
  exec("nitro-cli run-enclave --cpu-count 2 --memory 512 --enclave-cid 16 --eif-path hello.eif --debug-mode", (error, stdout, stderr) => {
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
    res.json({
      "status": "success",
      "response": JSON.stringify(stdout,null,4)
    });
  });
});

module.exports = router;
