const request = require('request');
const cheerio = require('cheerio');
const { createApolloFetch } = require('apollo-fetch');
let YELP_CATEGORIES = require('./yelpcategories.js');

// Convert military time to standard format
const convertTime = (time) => {
  const hours = Number(time[0] + time[1]);
  const minutes = Number(time[2] + time[3]);
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = String(hours);
  } else if (hours > 12) {
    timeValue = String(hours - 12);
  } else if (hours === 0) {
    timeValue = '12';
  }

  timeValue += (minutes < 10) ? ':0' + minutes : ':' + minutes;
  timeValue += (hours >= 12) ? ' PM' : ' AM';

  return timeValue;
};

const yelpSearch = (loc, keyword, resultLimit, offset) => {
  return new Promise((resolve, reject) => {
    keyword = keyword || 'popular';
    resultLimit = resultLimit || 18;
    offset = offset || 0;

    YELP_CATEGORIES = YELP_CATEGORIES.split('\n').join('');
    const queryString = `
    {
      search(term: "${keyword}"
             location: "${loc}"
             limit: ${resultLimit}
             categories: "${YELP_CATEGORIES}"
             offset: ${offset}) {
        total
        business {
          name
          id
          location {
            formatted_address
          }
          display_phone
          photos
          url
          rating
          price
        }
      }
    }`;

    const fetch = createApolloFetch({
      uri: 'https://api.yelp.com/v3/graphql'
    });

    fetch.use(({ options }, next) => {
      if (!options.headers) {
        options.headers = {};
      }
      options.headers['Authorization'] = `Bearer ${process.env.yelpKey}`;
      next();
    });

    fetch({
      query: `query ${queryString}`
    }).then((res) => {
      console.log('yelp res', res);
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

const yelpSearchDetails = (id) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://api.yelp.com/v3/businesses/${id}`,
      headers: {
        Authorization: `Bearer ${process.env.yelpKey}`
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
        if (data.hours && data.hours[0].open) {
          const allHours = data.hours[0].open;
          storeData.hours = [];
          allHours.forEach((storeHour) => {
            const day = NUM_DAY_TO_ACTUAL[storeHour.day];
            const start = convertTime(storeHour.start);
            const end = convertTime(storeHour.end);
            storeData.hours.push(`${day}: ${start} - ${end}`);
          });
        } else {
          storeData.hours = ['Hours Forthcoming'];
        }
        storeData.photos = data.photos;
        storeData.price = data.price;
        storeData.rating = data.rating;
        resolve(storeData);
      }
    });
  });
};

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

const createSession = (req, res, newUser) => {
  return req.session.regenerate(() => {
    req.session.user = newUser.username;
    res.cookie('loggedIn', 'true', { maxAge: 60 * 60 * 1000 });
    res.status(200).send('Successfully logged in');
  });
};

exports.yelpSearch = yelpSearch;
exports.yelpSearchDetails = yelpSearchDetails;
exports.parseWebsiteUrl = parseWebsiteUrl;
exports.createSession = createSession;
