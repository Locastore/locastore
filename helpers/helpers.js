const request = require('request');
const config = require('../config.js');
const cheerio = require('cheerio');
const { createApolloFetch } = require('apollo-fetch');
const YELP_CATEGORIES = require('./yelpcategories.js');

const yelpSearch = (loc, keyword, resultLimit) => {
  return new Promise((resolve, reject) => {
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

    if (keyword === undefined) {
      options.qs.term = 'local';
    } else {
      options.qs.term = keyword;
    }

    if (resultLimit === undefined) {
      options.qs.limit = 18;
    } else {
      options.qs.limit = resultLimit;
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

const yelpSearchDetails = (id) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.yelp.com/v3/businesses/${id}`,
      headers: {
        Authorization: `Bearer ${config.yelpKey}`
      }
    };

    request(options, (err, res, body) => {
      if (err) {
        console.log(`Unable to get yelp detailed business data: ${err}`);
        reject(err);
      } else {
        // Used to format yelp API's hour result to human readable format
        const NUM_DAY_TO_ACTUAL = {
          0: 'Monday',
          1: 'Tuesday',
          2: 'Wednesday',
          3: 'Thursday',
          4: 'Friday',
          5: 'Saturday',
          6: 'Sunday'
        };

        const data = JSON.parse(body);
        const storeData = {};
        const allHours = data.hours[0].open;
        storeData.hours = [];
        allHours.forEach((storeHour) => {
          const day = NUM_DAY_TO_ACTUAL[storeHour.day];
          storeData.hours.push(`${day}: ${storeHour.start} - ${storeHour.end}`);
        });
        storeData.photos = data.photos;
        resolve(storeData);
      }
    });
  });
}

// Used to attempt to parse website URL from Yelp's website, their API only
// returns the yelp link to their business
const parseWebsiteUrl = (data) => {
  const url = `https://www.yelp.com/biz/${data.id}`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        console.log(`Unable to retrieve website from yelp ${err}`);
        reject(err);
      } else {
        const $ = cheerio.load(body);
        const parsedUrl = $('.biz-website > a').text();
        data.website = parsedUrl;
        resolve(data);
      }
    });
  });
};

exports.yelpSearch = yelpSearch;
exports.yelpSearchDetails = yelpSearchDetails;
exports.parseWebsiteUrl = parseWebsiteUrl;
