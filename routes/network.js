const express = require('express');
const router = express.Router();
const { exec } = require("child_process");

router.post('/start', (req, res, next) => {

  var command = 'vsock-proxy 8001 ip-ranges.amazonaws.com 443 --config ~/host/enclave/nitro/vsock-proxy.yaml &';
  
  exec('ps -eaf | grep -c vsock', (error, stdout, stderr) => {
      console.log(error,'\n', stdout, '\n', stderr);
      if(parseInt(stdout) == 3) {
        res
        .status(200)
        .json({
          "response": "Proxy is on"
        });
        return;
      } else {
        exec(command, (error, stdout, stderr) => {
            res
            .status(200)
            .json({
              "response": "Proxy is on"
            });
        });
        return;
      }
  });

});

module.exports = router;
