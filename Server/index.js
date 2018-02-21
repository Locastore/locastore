const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/location', (req, res) => {

  res.send('success');
});

app.get('/', (req, res) => {
  res.send('success');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
