const request = require('request');
const config = require('../config.js');

let getLocationData = (location, callback) => {
  let options = {
    url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:us&types=(cities)&input=${location}&key=${config.key}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {

  callback(locationData);
  });
}

let getPlaceDetails = (product, callback) => {
  let options = {
    url: `https://maps.googleapis.com/maps/api/place/search/json?rankby=distance&keyword=${product}&key=${config.key}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {

  callback(productData);
  });
}
