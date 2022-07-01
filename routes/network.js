const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const { Console } = require('console');

router.post('/start', (req, res, next) => {

  var command = 'vsock-proxy 8001 ip-ranges.amazonaws.com 443 --config ~/host/enclave/nitro/vsock-proxy.yaml &';
  
  exec('ps -eaf | grep -c vsock', (error, stdout, stderr) => {

    if(parseInt(stdout) == 3) {
        console.log("process is running");
        res
        .status(200)
        .json({
            "response": "Proxy is on"
        });
        return;
    } else if(parseInt(stdout) < 3){
        console.log("process is not running");
        exec(command, (error, stdout, stderr) => {
            res
            .status(200)
            .json({
                "response": "Proxy is on"
            });
            return;
        });
    }
    console.log("process is running/not running/who cares");
    res
    .status(500)
    .json({
    "response": "Unknwon error encountered"
    });

  });

});

module.exports = router;
