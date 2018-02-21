const mongoose = require('mongoose');
mongoose.connect = ('mongodb://localhost/test');  // <--- to be updated / deleted
const db = mongoose.connection;

var LocaSchema = mongoose.Schema({
  column1: String,
  column2: String,
  column3: String,
  column4: String,
  column5: String,
  column6: String,
  column7: String,
  column8: String
});

