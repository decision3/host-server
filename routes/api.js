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

module.exports = router;
