var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
  enrolledStudent: String,
  sectionEnrolledIn: String
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
