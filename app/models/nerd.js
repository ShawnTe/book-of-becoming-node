var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NerdSchema = new Schema({
  name : {type : String, default: ''},
  // nickname:  String,
  // blickname:  {type : String, default: 'bubba'}
});

module.exports = mongoose.model('Nerd', NerdSchema);
