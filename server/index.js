const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../helpers/helpers.js');
const path = require('path');
const User = require('../database/index.js');
// const UserNameIsInUse = require('../helpers/helpers.js');
const app = express();
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost/locastoreTest'
mongoose.connect(MONGODB_URI, { useMongoClient: true });

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

let locationRetainer = '';

app.post('/location', (req, res) => {
  let location = req.body.text;
  locationRetainer = location.slice();
  console.log(locationRetainer);
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

app.post('/product', (req, res) => {
  let product = req.body.text;
  let prodLocation = locationRetainer.slice();
  console.log(prodLocation);
  util.getCoordinateData(prodLocation, (data) => {
    const { lng, lat } = data.results[0].geometry.location;
    util.getLocationData(lat, lng, product, (locData) => {
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

app.post('/signup', function (req, res, next) {
  // console.log(req.body, '<-- the body of new user data');
  let newuser = req.body.username;
  if(util.NameIsInUse(newuser)) {
    res.send('Error, that username already in use. Choose another username.')
  } else {
  let saveUser = new User(req.body);
  saveUser.save(function () {
    console.log(`user has been added to db.`);
  });
  res.send(`${newuser} has been added to the database.`);
  }
})

app.get('/product', (req, res) => {
  res.send('success');
});

app.get('/*', (req, res) => {
  res.redirect('/');
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});


