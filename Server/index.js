// server code here
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('success');
});

app.listen(PORT, () => {
  console.log(`Listening for requests on ${PORT}`);
});
