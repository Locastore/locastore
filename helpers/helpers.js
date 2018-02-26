const request = require('request');
const config = require('../config.js');
const User = require('../database/index.js');

/*

OPTIONAL 0): autocomplete at some point
1) Use user search input to query google geocode API and retrieve
coordinates. https://maps.googleapis.com/maps/api/geocode/json?address='95051'&key={KEY}
2) Take coordinates from #1, then search google place API and grab nearby businesses.
https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&location=37.3598283,-121.9814354&keyword='flowers'&radius=10000&key={KEY}
3) Take business ID from #2 and grab more business details from google details API
https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJqZitiLrMj4ARGTbRPXeLFgE&key={KEY}

*/

const getCoordinateData = (location, callback) => {
  const options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address='${location}'&key=${config.key}`,
    method: 'GET'
  };
  request(options, (err, res, body) => {
    if (err) {
      console.log(`Unable to obtain coordinate data from google API ${err}`);
    } else {
      console.log('Successfully obtained coordinate data from google!');
      callback(JSON.parse(body));
    }
  });
};

// const getAutoCompleteData = (location, callback) => {
//   const options = {
//     url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:us&types=(cities)&input=${location}&key=${config.key}`,
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'User-Agent': 'request'
//     },
//   };
//   request(options, (err, res, body) => {
//     callback(locationData);
//   });
// };

const getLocationData = (lat, long, keyword, callback) => {
  const options = {
    // Currently hardcoding radius to 15 miles, can make this a dropdown option in future
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&location=${lat},${long}&keyword=${keyword}&radius=24140&key=${config.key}`,
    method: 'GET'
  };
  request(options, (err, res, body) => {
    if (err) {
      console.log(`Unable to get google place API data: ${err}`);
    } else {
      console.log('Successfully retrieved google location API data');
      callback(JSON.parse(body));
    }
  });
};

const getPlaceDetails = (storeData) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${storeData.place_id}&key=${config.key}`,
      method: 'GET'
    };
    request(options, (err, res, body) => {
      if (err) {
        console.log(`Unable to get google place API data: ${err}`);
        reject(err);
      } else {
        console.log('Successfully retrieved google place details API data');
        let data = JSON.parse(body);
        data = data.result;
        storeData.address = data.formatted_address;
        storeData.phone = data.formatted_phone_number;
        // storeData.hours = data.opening_hours.weekday_text;
        storeData.photos = data.photos;
        storeData.website = data.website;
        resolve(storeData);
      }
    });
  });
};

const nameIsInUse = (newUser, cb) => {
  console.log(newUser, '<-- that is the newUser passed in from the Post request in the nameIsInUse helper');
  User.find({'username': newUser}, function(err, user) {
    if (err) {
      console.log('User.find resulted in an error');
    } else {
      // console.log(user, "<--that is the user passed from the User.find operation");
      if (user.length < 1 ) {
        cb(false);
      } else {
        cb(true);
      }
      // if (user[0].username === newUser) {
      //         console.log(user[0].username, ' equals ', newUser, ' in nameIsInUse helper.');
      //         cb(true);
      //       } else {
      //         console.log(user[0].username, ' does not equal ', newUser, ' in nameIsInUse helper.');
      //         cb(false);
      //       }
    }
  });
}

const addUser = function (body, name, cb) {
  let saveUser = new User(body);
  console.log(saveUser, "<-- saveUser in the addUser fn");
  saveUser.save(function (err) {
    if (err) {
      console.log('.save error');
    } else {
    console.log(`${name} has been added to db <-- node console log.`);
    cb(name);}
  });
}

exports.getCoordinateData = getCoordinateData;
exports.getLocationData = getLocationData;
exports.getPlaceDetails = getPlaceDetails;
exports.nameIsInUse = nameIsInUse;
exports.addUser = addUser;