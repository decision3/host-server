const express = require('express');
const router = express.Router();
const { exec, spawn } = require("child_process");

router.post('/', (req, res, next) => {

    // TODO: this is just a template, need to work on this

    var command = 'sudo systemctl enable nitro-enclaves-vsock-proxy.service && sudo systemctl start nitro-enclaves-vsock-proxy.service';
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
            exec(command);
            res.status(200)
            .json({
                "response": "Proxy is on"
            });
            return;
        }
    });
});

module.exports = router;
