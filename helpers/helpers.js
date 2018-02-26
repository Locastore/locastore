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
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&location=37.3598283,-121.9814354&keyword=''&rankby=distance&key=AIzaSyAcjoB6fSfFu-Qk-RkqStE6AjEjGz07kqg
const getLocationData = (lat, long, keyword, callback) => {
  const options = {
    // Ranking by distance because google API default ranks by prominence
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=store&location=${lat},${long}&keyword=${keyword}&rankby=distance&key=${config.key}`,
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
    console.log(options);
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
        // This data doesn't always exist
        if (data.opening_hours) {
          storeData.hours = data.opening_hours.weekday_text;
        }
        storeData.photos = data.photos;
        storeData.website = data.website;
        resolve(storeData);
      }
    });
  });
};

// Yelp API option
const yelpSearch = (loc, keyword) => {
  // categories based on https://www.yelp.com/developers/documentation/v3/all_category_list
  // Find non food related businesses
  return new Promise((resolve, reject) => {
    const YELP_CATEGORIES = `active,arts,auto,beautysvc,bicycles,education,
                        health,homeservices,hotelstravel,localservices,
                        nightlife,pets,professional,realestate,religiousorgs,
                        shopping`;

    const options = {
      url: 'https://api.yelp.com/v3/businesses/search',
      headers: {
        Authorization: `Bearer ${config.yelpKey}`
      },
      qs: {
        location: loc,
        radius: 24000, // in meters, about 15 miles
        categories: YELP_CATEGORIES
      }
    };

    if (keyword !== '') {
      options.qs.term = keyword;
    }

    request(options, (err, res, body) => {
      if (err) {
        console.log(`Unable to get yelp API data: ${err}`);
        reject(err);
      } else {
        console.log('Successfully queried Yelp API');
        resolve(JSON.parse(body));
      }
    });
  });
};

const yelpSearchDetails = (storeData) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.yelp.com/v3/businesses/${storeData.place_id}`,
      headers: {
        Authorization: `Bearer ${config.yelpKey}`
      }
    };

    request(options, (err, res, body) => {
      if (err) {
        console.log(`Unable to get yelp detailed business data: ${err}`);
        reject(err);
      } else {
        const data = JSON.parse(body);
        storeData.hours = data.hours;
        storeData.photos = data.photos;
        resolve(storeData);
      }
    });
  });
};

exports.yelpSearch = yelpSearch;
exports.yelpSearchDetails = yelpSearchDetails;
exports.getCoordinateData = getCoordinateData;
exports.getLocationData = getLocationData;
exports.getPlaceDetails = getPlaceDetails;
