const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var morgan = require('morgan')

// Importing routes
const enclavesRoute = require('./routes/enclave.js');
const proxyRoute = require('./routes/proxy.js');

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
app.use('/services/proxy', proxyRoute);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
