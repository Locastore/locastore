const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const MONGODB_URI = process.env.MONGO_URI || 'localhost/locastore';
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
if (DB_USER === '' && DB_PASSWORD === '') {
  var CONNECT_STRING = `mongodb://${MONGODB_URI}`;
} else {
  var CONNECT_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_URI}`;
}
mongoose.connect(`${CONNECT_STRING}`);

const Schema = mongoose.Schema;

const Users = new Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  isLoggedIn: {},
  favorites: [Schema.Types.Mixed]
});

const User = mongoose.model('User', Users);

const addUser = function (body, cb) {
  body.password = encryptPassword(body.password);
  let saveUser = new User(body);
  saveUser.save(function (err, user) {
    if (err) {
      if (firstSixChar(err.errmsg) === 'E11000') {
        cb(`We're sorry but the username `, `${body.username} is already taken. Please choose another.`)
      } else {
        cb('err.errmsg');
      }
    } else {
      cb(body.username, ' has been set up as a new user profile.');
    }
  });
}

const encryptPassword = function (password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

const checkCredentials = function (credentials, cb) {
  User.find({username: credentials.username} , function (err, result) {
    if (err) {
      cb(err.errmsg);
    } else {
      if(result.length > 0 ) {
        bcrypt.compare(credentials.password, result[0].password, function (err, result) {
          if (err) {
            cb(err);
          } else {
            if(result) {
              cb(true);
            } else {
              cb(false);
            }
          }
        });
      } else {
        cb('unknown user');
      }
    }
  })
}

const saveFavorite = function(user, business) {
  return User.findOneAndUpdate(
    { username: user },
    { $addToSet: {'favorites': business} },
    { new: true }
  );
}

const deleteFavorite = function(user, business) {
  return User.update(
    { username: user },
    { $pull: {'favorites': { place_id: business.place_id }}}
  );
}

const retrieveFavorites = function(user) {
  return User.findOne({ username: user })
    .select('favorites')
    .lean()
}

const firstSixChar = function(string) {
  return string.substring(0,6);
}

const comparePassword = function (attemptedPassword, callback ) {
  bcrypt.compare()
}

exports.Model = User;
exports.addUser = addUser;
exports.checkCredentials = checkCredentials;
exports.comparePassword = comparePassword;
exports.saveFavorite = saveFavorite;
exports.deleteFavorite = deleteFavorite;
exports.retrieveFavorites = retrieveFavorites;