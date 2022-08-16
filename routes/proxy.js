const express = require('express');
const router = express.Router();
const { exec, spawn } = require("child_process");

router.post('/', (req, res, next) => {

    // TODO: this is just a template, need to work on this

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
            spawn(command, ['8001', 'www.decision3.ai', '443', '--config', '/home/ec2-user/host/enclave/nitro/vsock-proxy.yaml']);
            res.status(200)
            .json({
                "response": "Proxy is on"
            });
            return;
        }
    });
});

module.exports = router;
