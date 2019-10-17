const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { test } = require('./controller/test.js');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/build', express.static(path.join(__dirname,"../build")))
app.get('/', function(req, res) {
  const index = path.resolve(__dirname, '../index.html');
  res.sendFile(index);
})

app.get('/api', (req,res) => {
  res.send(JSON.stringify(test));
})

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj);
})
  
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
  
module.exports = app;
