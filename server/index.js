const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../helpers/helpers.js');
const path = require('path');
const User = require('../database/index.js');
const blacklist = require('../helpers/blacklist.js');
const session = require('express-sessions');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use(session({
//   secret: 'T29HJYjflK',
//   resave: false,
//   saveUninitialized: true
// }))

let locationRetainer = '';

app.post('/location', (req, res) => {
  const location = req.body.text;
  locationRetainer = location.slice();
  util.yelpSearch(location)
    .then((result) => {
      const businessArr = [];
      const results = result.data.search;
      if (result.errors || results.total === 0) {
        console.log(`No businesses found at location: ${location}`);
        res.status(204).send(businessArr);
      } else {
        results.business.forEach((store) => {
          const storeData = {
            name: store.name,
            place_id: store.id,
            address: store.location.formatted_address.split('\n').join(', '),
            phone: store.display_phone,
            website: store.url.split('?')[0],
            photos: store.photos[0]
          };
          businessArr.push(storeData);
        });
        res.status(200).send(businessArr);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to retrieve business data from Yelp API');
    });
});

app.post('/product', (req, res) => {
  const product = req.body.text;
  const prodLocation = locationRetainer.slice();
  util.yelpSearch(prodLocation, product, 50)
    .then((result) => {
      const businessArr = [];
      const results = result.data.search;
      if (result.errors) {
        console.log('Yelp API returned an error');
        console.log(result.errors);
        res.status(204).send(businessArr);
      } else if (results.total === 0) {
        console.log(`No results found for: ${product}`);
        res.status(204).send(businessArr);
      } else {
        results.business.forEach((store) => {
          if (!blacklist.has(store.name.toLowerCase())) {
            const storeData = {
              name: store.name,
              place_id: store.id,
              address: store.location.formatted_address.split('\n').join(', '),
              phone: store.display_phone,
              website: store.url.split('?')[0],
              photos: store.photos[0]
            };
            businessArr.push(storeData);
          }
        });
        res.status(200).send(businessArr);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to retrieve business data from Yelp API');
    });
});

app.post('/signup', function (req, res) {
  const newUser = req.body;
  const successResponse = function (data, string) {
    res.send(`${data}${string}`);
  };
  User.addUser(newUser, successResponse);
});

app.post('/login', function (req, res) {
  const credentials = req.body;
  const sendResponse = function (data, string) {
    res.send(`${data}${string}`);
  };

  const redirect = function (endpoint) {
    res.redirect(endpoint);
  };

  User.checkCredentials(credentials, sendResponse, redirect);
});


app.get('/business', (req, res) => {
  util.yelpSearchDetails(req.query.id)
    .then((detailedData) => {
      detailedData.id = req.query.id;
      return util.parseWebsiteUrl(detailedData);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Failed to retrieve detailed business data from Yelp: ${err}`);
    });
});

app.post('/favorite', (req, res) => {
  const business = req.body.business;
  const user = 'norbie'; // temporary until we get user sessions setup
  User.saveFavorite(user, business)
    .then((result) => {
      console.log(`Successfully saved favorite for ${user}`);
      res.status(201).send('Successfully saved favorite to database');
    })
    .catch((err) => {
      console.log('Failed to save favorite to database');
      console.log(err);
      res.status(500).send('Failed to save favorite to database');
    });
});

app.get('/favorite', (req, res) => {
  const user = 'norbie'; // temporary until we get user sessions setup
  User.retrieveFavorites(user)
    .then((result) => {
      console.log(`Successfully retrieved favorites for ${user}`);
      // console.log(result.favorites);
      res.status(200).send(result.favorites);
    })
    .catch((err) => {
      console.log(`Failed to retrieve favorites for ${user}`);
      console.log(err);
      res.status(500).send('Failed to retrieve favorites');
    });
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
