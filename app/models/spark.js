var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SparkSchema = new Schema({
  title : { type : String, required: true },
  details : { type : String },

  _theme : { type: Number, ref: 'Theme' },

  created_at : Date,
  updated_at : Date
});

module.exports = mongoose.model('Spark', SparkSchema);
