const express = require('express');
const router = express.Router();
const { execSync } = require("child_process");
const { Console } = require('console');

router.post('/start', (req, res, next) => {

    var command = 'vsock-proxy 8001 ip-ranges.amazonaws.com 443 --config ~/host/enclave/nitro/vsock-proxy.yaml';
    var processCount = 0;

    execSync('ps -eaf | grep -c vsock', (error, stdout, stderr) => {
        console.log("got some processes...");
        processCount = parseInt(stdout);
    });

    if(processCount == 3) {
        console.log("process is running");
        res
        .status(200)
        .json({
            "response": "Proxy is on"
        });
        return;
    } else if(processCount < 3){
        console.log("process is not running");
        console.log(command);
        try {
            execSync(command, (error, stdout, stderr) => {
                console.log("starting the process");
                res
                .status(200)
                .json({
                    "response": "Proxy is on"
                });
                return;
            });
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;
