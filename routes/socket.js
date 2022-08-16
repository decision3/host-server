const express = require('express');
const router = express.Router();
const { exec, spawn } = require("child_process");
const socket = require('socket');
const sys = require('sys');

router.post('/call', (req, res, next) => {

    // TODO: implement the socket interface for communicating with the enclave

    res.status(200)
    .json({
        "response": "Network interface is meh"
    });
});

module.exports = router;
