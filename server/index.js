const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../helpers/helpers.js');
const path = require('path');
// const db = require('../database/index.js');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

let locationRetainer = '';

app.post('/location', (req, res) => {
  const location = req.body.text;
  locationRetainer = location.slice();
  util.yelpSearch(location)
    .then((results) => {
      const promiseArr = [];
      results.businesses.forEach((store) => {
        const storeData = {
          name: store.name,
          place_id: store.id,
          address: store.location.display_address.join(' '),
          phone: store.display_phone,
          website: store.url.split('?')[0]
        };
        promiseArr.push(util.yelpSearchDetails(storeData));
      });
      Promise.all(promiseArr)
        .then((yelpData) => {
          console.log('Successfully finished all yelp API queries');
          res.status(200).send(yelpData);
        })
        .catch((err) => {
          console.log(`Failed to complete yelp API queries: ${err}`);
          res.status(500).send(`Failed to complete yelp API queries: ${err}`);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to retrieve business data from Yelp API');
    });
});

app.post('/product', (req, res) => {
  const product = req.body.text;
  const prodLocation = locationRetainer.slice();
  util.yelpSearch(prodLocation, product)
    .then((results) => {
      const promiseArr = [];
      results.businesses.forEach((store) => {
        const storeData = {
          name: store.name,
          place_id: store.id,
          address: store.location.display_address.join(' '),
          phone: store.display_phone,
          website: store.url.split('?')[0]
        };
        promiseArr.push(util.yelpSearchDetails(storeData));
      });
      Promise.all(promiseArr)
        .then((yelpData) => {
          console.log('Successfully finished all yelp API queries');
          res.status(200).send(yelpData);
        })
        .catch((err) => {
          console.log(`Failed to complete yelp API queries: ${err}`);
          res.status(500).send(`Failed to complete yelp API queries: ${err}`);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Failed to retrieve business data from Yelp API');
    });
});

app.get('/product', (req, res) => {
  res.send('success');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
