const express = require('express');
const router = express.Router();
const { exec } = require("child_process");

router.post('/start', (req, res, next) => {

  var command = 'vsock-proxy 8001 ip-ranges.amazonaws.com 443 --config ~/host/enclave/nitro/vsock-proxy.yaml &';
  
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
      "response": "Proxy is on"
    });
  });

});

module.exports = router;
