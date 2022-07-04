// pkg package.json --targets node16-linux --out-path ./bin/
// ./bin/d3-host > /usr/tmp/d3-host.log &

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var morgan = require('morgan')

// Importing routes
const enclavesRoute = require('./routes/enclave.js');
const networkRoute = require('./routes/network.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('combined'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.use('/enclave', enclavesRoute);
app.use('/network', networkRoute);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
