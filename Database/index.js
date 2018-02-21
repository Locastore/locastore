const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let LocaRecords = new Schema ({
  column1: String,
  column2: String,
  column3: String,
  column4: String,
  column5: String,
  column6: String,
  column7: String,
  column8: String
});

let LocaRecord = mongoose.model('LocaRecord', LocaRecords);

module.exports = LocaRecord;