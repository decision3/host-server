const express = require('express');
const router = express.Router();
const { exec, spawn } = require("child_process");

router.post('/start', (req, res, next) => {

    var command = 'vsock-proxy';
    var processCount = 0;

    exec('ps -eaf | grep -c vsock', (error, stdout, stderr) => {
        processCount = parseInt(stdout);
        if(processCount == 3) {
            res.status(200)
            .json({
                "response": "Proxy is on"
            });
            return;
        } else if(processCount < 3){
            spawn(command, ['8001', 'ip-ranges.amazonaws.com', '443', '--config', '/home/ec2-user/host/enclave/nitro/vsock-proxy.yaml']);
            res.status(200)
            .json({
                "response": "Proxy is on"
            });
            return;
        }
    });
});

module.exports = router;
