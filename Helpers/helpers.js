const request = require('request');
const config = require('../config.js');

let getLocationData = (location, callback) => {
  let options = {
    url: `https://maps.googleapis.com/maps/api/js?key=${config.key}&libraries=places`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {

  });
}
