const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../helpers/helpers.js');
// const db = require('../database/index.js');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/location', (req, res) => {
  const location = req.body.text;
  util.getCoordinateData(location, (data) => {
    const { lng, lat } = data.results[0].geometry.location;
    util.getLocationData(lat, lng, '', (locData) => {
      const promiseArr = [];
      locData.results.forEach((store) => {
        let storeData = {
          name: store.name,
          place_id: store.place_id,
        };
        promiseArr.push(util.getPlaceDetails(storeData));
      });
      Promise.all(promiseArr)
        .then((results) => {
          console.log('Successfully finished all google API queries!');
          res.send(results);
        })
        .catch((err) => {
          console.log(`Failed to complete google API queries: ${err}`);
          res.send(`Failed to complete google API queries: ${err}`);
        });
    });
  });
});

// app.get('/location', (req, res) => {
//   db.LocaRecord.find({}).limit(12).exec((err, places) => {
//     if (err) {
//       console.log(err);
//     }
//     res.status(200).send(places);
//   });
// });

app.post('/products', (req, res) => {
  const product = req.body.text;
  util.getPlaceDetails(product, (req, res) => {
    // determine how to interact with place details API
  });
  res.send('success');
});

app.get('/products', (req, res) => {
  res.send('success');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
