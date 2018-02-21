const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../Helpers/helpers.js');
const db = require('../Database/index.js');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../Client/dist'));

app.post('/location', (req, res) => {
  var location = req.body.text;
  util.getLocationData(location, (data) => {
    // determine how to interact with places API
  })
  res.send('success');
});

app.get('/location', (req, res) => {
  db.LocaRecord.find({}).limit(12).exec((err, places) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(places);
  });
});

app.post('/products', (req, res) => {
  var product = req.body.text;
  util.getPlaceDetails(product, (req, res) => {
    // determine how to interact with place details API
  });
  res.send('success');
})

app.get('/products', (req, res) => {
  db.
  res.send('success');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
