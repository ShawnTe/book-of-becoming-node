var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ThemeSchema = new Schema({
  name : { type : String, default: '' },
  active: Boolean,

  _user : { type: Number, ref: 'User' },

  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Theme', ThemeSchema);
