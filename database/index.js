const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema ({
  username: {type: String, unique: true},
  email: String,
  password: String,
  favorites: [{name: String, ID: String, url: String}]
});

let User = mongoose.model('User', Users);

// move helpers to db file
// see if unique:true does the job of nameIsInUse (triggers the err in .save)

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

module.exports = User;
module.exports.nameIsInUse = nameIsInUse;
module.exports.addUser = addUser;