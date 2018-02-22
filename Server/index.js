const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../helpers/helpers.js');
const db = require('../database/index.js');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/location', (req, res) => {
  let location = req.body.text;
  util.getCoordinateData(location, function(data) {
    let long = data.results[0].geometry.location.lng;
    let lat = data.results[0].geometry.location.lat;
    util.getLocationData(lat, long, '', function(data) {
      data.results.forEach((store) => {
        let place_id = store.place_id;
        util.getPlaceDetails(place_id, function(data) {
          console.log(data);
          //then from here, gather the place details + place data and render to business view
          res.send('Successfully gathered place details');
        })
      });
    });
  });
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
  res.send('success');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
