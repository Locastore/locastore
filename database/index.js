const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema ({
  username: {type: String, unique: true},
  email: String,
  password: String,
  isLoggedIn: {},
  favorites: [{name: String, ID: String, url: String}]
  // session: [username: String, isLoggedIn: Boolean, favorites: [{name: String, ID: String, url: String}]]
});

let User = mongoose.model('User', Users);

const addUser = function (body, cb) {
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

const checkCredentials = function (credentials, cb1, cb2) {
  User.find(credentials , function (err, result) {
    if (err) {
        cb1(err.errmsg);  // res.send error to client
    } else {
      if(result.length > 0 ) {
        console.log(result, '<-- successfully found user in checkCredentials');
        console.log(result[0].username, '<-- username trying to res.send to client');
        cb1(`${result[0].username}`, ` authenticated`);
      } else {
        cb1('No such user found, please try again. Check spelling and remember that username and password are case-sensitive.')
      }
    }
  });
}

const firstSixChar = function(string) {
  return string.substring(0,6);
}

// exports.nameIsInUse = nameIsInUse;
exports.addUser = addUser;
exports.checkCredentials = checkCredentials;