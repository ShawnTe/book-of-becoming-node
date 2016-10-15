var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username : { type : String, required: true, unique: true },
  password : { type : String, required: true },
  email : { type : String, required: true, unique: true },
  created_at : Date,
  updated_at : Date
});

module.exports = mongoose.model('User', UserSchema);
