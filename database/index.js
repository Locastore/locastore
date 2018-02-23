const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema ({
  username: {type: String, unique: true},
  email: String,
  password: String,
  favorites: [{name: String, ID: String, url: String}]
});

let User = mongoose.model('User', Users);

module.exports = User;