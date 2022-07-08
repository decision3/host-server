const express = require('express');
const router = express.Router();
const { exec, spawn } = require("child_process");
const socket = require('socket');
const sys = require('sys');

router.post('/call', (req, res, next) => {
        // # Connect to the remote endpoint with CID and PORT specified.
        // try:
        //     self.sock = socket.socket(socket.AF_VSOCK, socket.SOCK_STREAM)
        //     self.sock.settimeout(self.conn_timeout)
        //     self.sock.connect(endpoint)
        // except ConnectionResetError as e:
        //     print("Caught error ", str(e.strerror)," ",str(e.errno))

    res.status(200)
    .json({
        "response": "Network interface is meh"
    });
});

module.exports = router;
