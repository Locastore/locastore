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
      const businessArr = [];
      if (results.error) {
        if (results.error.code === 'LOCATION_NOT_FOUND') {
          console.log(`No businesses found at location: ${location}`);
          res.status(204).send(businessArr);
        } else {
          console.log(`Yelp API return an error: ${results.error}`);
          res.status(500).send('Server error');
        }
      } else {
        results.businesses.forEach((store) => {
          const storeData = {
            name: store.name,
            place_id: store.id,
            address: store.location.display_address.join(' '),
            phone: store.display_phone,
            website: store.url.split('?')[0],
            photos: store.image_url
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
    .then((results) => {
      const businessArr = [];
      if (results.error) {
        console.log(`Yelp API return an error: ${results.error}`);
        res.status(500).send('Server error');
      } else if (results.total === 0) {
        console.log(`No results found for: ${product}`);
        res.status(204).send(businessArr);
      } else {
        results.businesses.forEach((store) => {
          const storeData = {
            name: store.name,
            place_id: store.id,
            address: store.location.display_address.join(' '),
            phone: store.display_phone,
            website: store.url.split('?')[0],
            photos: store.image_url
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

app.get('/*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
