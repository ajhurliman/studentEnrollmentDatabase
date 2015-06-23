var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  studentName: String
});

module.exports = mongoose.model('Student', studentSchema);
