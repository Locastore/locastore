const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

const Schema = mongoose.Schema;

let LocaRecords = new Schema ({
  businessName: {type: String, unique: true},
  address: String,
  hours: String,
  phone: String,
  photos: String,
  website: String,
  description: String,
});

let LocaRecord = mongoose.model('LocaRecords', LocaRecords);

module.exports = LocaRecord;