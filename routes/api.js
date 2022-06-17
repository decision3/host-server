const express = require('express');
const { exec } = require("child_process");

const router = express.Router();

router.get('/version', (req, res, next) => {
  exec("nitro-cli --version", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    res.json({
      "version": stdout
    });
  });
});

router.get('/describe', (req, res, next) => {
  exec("nitro-cli describe-enclaves", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    res.json({
      "description": stdout
    });
  });
});

router.get('/build/hello', (req, res, next) => {
  exec("docker build /usr/share/nitro_enclaves/examples/hello -t hello", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    res.json({
      "status": success,
      "response": stdout
    });
  });
});

module.exports = router;
