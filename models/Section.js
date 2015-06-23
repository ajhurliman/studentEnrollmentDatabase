var mongoose = require('mongoose');

var sectionSchema = mongoose.Schema({
  sectionName: String
});

module.exports = mongoose.model('Section', sectionSchema);
