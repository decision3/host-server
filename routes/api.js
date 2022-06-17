const express = require('express');
const { exec } = require("child_process");

const router = express.Router();

router.get('/version', (req, res, next) => {
  exec("nitro-cli --version", (error, stdout, stderr) => {
    if (error) {
      res.json({
        "error": error.message
      });
    }
    if (stderr) {
        res.json({
          "error": stderr
        });
    }
    res.json({
      "version": stdout
    });
  });
});

router.get('/describe', (req, res, next) => {
  exec("nitro-cli describe-enclaves", (error, stdout, stderr) => {
    if (error) {
      res.json({
        "error": error.message
      });
    }
    if (stderr) {
        res.json({
          "error": stderr
        });
    }
    res.json({
      "description": stdout
    });
  });
});

router.get('/build/docker/hello', (req, res, next) => {
  exec("docker build /usr/share/nitro_enclaves/examples/hello -t hello", (error, stdout, stderr) => {
    if (error) {
      res.json({
        "error": error.message
      });
    }
    if (stderr) {
        res.json({
          "error": stderr
        });
    }
    res.json({
      "status": "success",
      "response": stdout
    });
  });
});

router.get('/build/enclave/hello', (req, res, next) => {
  exec("nitro-cli build-enclave --docker-uri hello:latest --output-file hello.eif", (error, stdout, stderr) => {
    if (error) {
      res.json({
        "error": error.message
      });
    }
    if (stderr) {
        res.json({
          "error": stderr
        });
    }
    res.json({
      "status": "success",
      "response": stdout
    });
  });
});

module.exports = router;
