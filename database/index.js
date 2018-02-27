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

// const nameIsInUse = (newUser, cb) => {
//   console.log(newUser, '<-- that is the newUser passed in from the Post request in the nameIsInUse helper');
//   User.find({'username': newUser}, function(err, user) {
//     if (err) {
//       console.log('User.find resulted in an error');
//     } else {
//       // console.log(user, "<--that is the user passed from the User.find operation");
//       if (user.length < 1 ) {
//         cb(false);
//       } else {
//         cb(true);
//       }
//     }
//   });
// }

const addUser = function (body, name, cb) {
  let saveUser = new User(body);
  console.log(saveUser, "<-- saveUser in the addUser fn");
  saveUser.save(function (err) {
    if (err) {
      if (firstSixChar(err.errmsg) === 'E11000') {
        cb(`We're sorry but the username `, `${name} is already taken. Please choose another.`)
      } else {
        cb('err.errmsg');
      }
    } else {
    cb(name, ' has been added.');
    }
  });
}

const firstSixChar = function(string) {
  return string.substring(0,6);
}

// exports.nameIsInUse = nameIsInUse;
exports.addUser = addUser;