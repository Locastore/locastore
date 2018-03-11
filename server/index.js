const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('../helpers/helpers.js');
const path = require('path');
const User = require('../database/index.js');
const blacklist = require('../helpers/blacklist.js');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cookieParser());
app.use(session({
  secret: 'T29HJYjflK',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: process.env.googleCallbackURL
  },
  (token, tokenSecret, profile, done) => {
    User.Model.findOne({ username: profile.id }, (err, user) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      const newUser = new User.Model();
      newUser.username = profile.id;
      newUser.email = profile.emails[0].value;
      newUser.save((error) => {
        if (err) {
          console.log('Failed to create user with google oauth');
          console.log(error);
        }
        return done(null, newUser);
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});


passport.deserializeUser((id, done) => {
  User.Model.findById(id, (err, user) => {
    done(err, user);
  });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.session.passport.user;
    res.cookie('loggedIn', 'true', { maxAge: 60 * 60 * 1000 });
    res.redirect('/');
  }
);

app.post('/postlocation', (req, res) => {
  const location = req.body.text;
  req.session.location = location;
  util.yelpSearch(location)
    .then((result) => {
      const businessArr = [];
      const results = result.data.search;
      if (result.errors || results.total === 0) {
        console.log(`No businesses found at location: ${location}`);
        res.status(204).send(businessArr);
      } else {
        results.business.forEach((store) => {
          console.log('returned store', store);
          const storeData = {
            name: store.name,
            place_id: store.id,
            address: store.location.formatted_address.split('\n').join(', '),
            phone: store.display_phone,
            website: store.url.split('?')[0],
            photos: store.photos[0],
            price: store.price,
            rating: store.rating,
            latitude: store.coordinates.latitude,
            longitude: store.coordinates.longitude
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
  const prodLocation = req.session.location;
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
              photos: store.photos[0],
              price: store.price,
              rating: store.rating
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

app.post('/signup', (req, res) => {
  const newUser = req.body;
  const successResponse = function (data, string) {
    res.send(`${data}${string}`);
  };
  User.addUser(newUser, successResponse);
});

app.post('/postlogin', (req, res) => {
  const credentials = req.body;
  const handleVerify = function (verifyResult) {
    if (verifyResult === true) {
      util.createSession(req, res, credentials);
    } else if (verifyResult === false) {
      res.status(400).send('Password incorrect, please try again. Check spelling and remember that username and password are case-sensitive.');
    } else if (verifyResult === 'unknown user') {
      res.status(400).send('No such user found, please try again. Check spelling and remember that username and password are case-sensitive.');
    } else {
      res.status(400).send(verifyResult);
    }
  };
  User.checkCredentials(credentials, handleVerify);
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
  const { business } = req.body;
  const { user } = req.session;
  User.saveFavorite(user, business)
    .then(() => {
      console.log(`Successfully saved favorite for ${user}`);
      res.status(201).send('Successfully saved favorite to database');
    })
    .catch((err) => {
      console.log('Failed to save favorite to database');
      console.log(err);
      res.status(500).send('Failed to save favorite to database');
    });
});

app.post('/unfavorite', (req, res) => {
  const { business } = req.body;
  const { user } = req.session;
  User.deleteFavorite(user, business)
    .then(() => {
      console.log(`Successfully deleted favorite for ${user}`);
      res.status(201).send('Successfully deleted favorite from database');
    })
    .catch((err) => {
      console.log('Failed to delete favorite from database');
      console.log(err);
      res.status(500).send('Failed to delete favorite from database');
    });
});

app.get('/favorite', (req, res) => {
  const { user } = req.session;
  User.retrieveFavorites(user)
    .then((result) => {
      console.log(`Successfully retrieved favorites get for ${user}`);
      res.status(200).send(result.favorites);
    })
    .catch((err) => {
      console.log(`Failed to retrieve favorites for ${user}`);
      console.log(err);
      res.status(500).send('Failed to retrieve favorites');
    });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('loggedIn');
    req.logout();
    res.redirect('/login');
  });
});

app.get('/location/*', (req, res) => {
  res.redirect('/location');
});

app.get('/*', (req, res) => {
  console.log(req.session);
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening for requests on ${port}`);
});
