const express = require('express');
const router = express.Router();
const { exec } = require("child_process");

router.post('/start', (req, res, next) => {

  var command = 'vsock-proxy 8001 ip-ranges.amazonaws.com 443 --config ~/host/enclave/nitro/vsock-proxy.yaml &';
  
  exec('ps -eaf | grep -c vsock', (error, stdout, stderr) => {
      res
      .status(200)
      .json({
        "response": stdout
      });
  });

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.log(error);
//       res
//       .status(500)
//       .json({
//         "error": error.message
//       });
//       return;
//     }
//     if (stderr) {
//       console.log(stderr);
//       res
//       .status(500)
//       .json({
//         "error": stderr
//       });
//       return;
//     }
//     res
//     .status(200)
//     .json({
//       "response": "Proxy is on"
//     });
//   });

});

module.exports = router;
