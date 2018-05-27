
const mongoose = require('mongoose');
const MatchSchema = new mongoose.Schema({  
  Host: String,
  Code: String,
  Location: String,
  Main: String
});
module.exports = mongoose.model('Match', MatchSchema);