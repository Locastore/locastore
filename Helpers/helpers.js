const request = require('request');
const config = require('../config.js');

/*

OPTIONAL 0): autocomplete at some point
1) Use user search input to query google geocode API and retrieve
coordinates. https://maps.googleapis.com/maps/api/geocode/json?address='95051'&key={KEY}

2) Take coordinates from #1, then search google place API and grab nearby businesses.
https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&location=37.3598283,-121.9814354&keyword='flowers'&radius=10000&key={KEY}

3) Take business ID from #2 and grab more business details from google details API
https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJqZitiLrMj4ARGTbRPXeLFgE&key={KEY}

*/
let getCoordinateData = (location, callback) => {
  let options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address='${location}'&key=${config.key}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    if (err) {
      console.log('Unable to obtain coordinate data from google API ' + err);
    } else {
      console.log('Successfully obtained coordinate data from google!');
      // need to verify how google API returns this data
      callback(JSON.parse(body));
    }
  });
}

let getAutoCompleteData = (location, callback) => {
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

let getLocationData = (lat, long, keyword, callback) => {
  let options = {
    // Currently hardcoding radius to 15 miles, can make this a dropdown option in future
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&location=${lat},${long}&keyword=${keyword}&radius=24140&key=${config.key}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    if (err) {
      console.log('Unable to get google place API data: ' + err);
    } else {
      console.log('Successfully retrieved google place API data');
      callback(JSON.parse(body));
    }
  });
}

let getPlaceDetails = (placeId, callback) => {
  let options = {
    url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${config.key}`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    if (err) {
      console.log('Unable to get google place API data: ' + err);
    } else {
      console.log('Successfully retrieved google place API data');
      callback(JSON.parse(body));
    }
  });
}

exports.getCoordinateData = getCoordinateData;
exports.getLocationData = getLocationData;
exports.getPlaceDetails = getPlaceDetails;
