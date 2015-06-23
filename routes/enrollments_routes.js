'use strict';

var Enrollment = require('../models/Enrollment');

module.exports = function(app) {
  //create an enrollment
  app.post('/api/enrollments', function(req, res) {
    var enrollment = new Enrollment(req.body);
    enrollment.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //read an enrollment by ID
  app.get('/api/enrollments/:id', function(req, res) {
    Enrollment.findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //destroy an enrollment
  app.delete('/api/enrollments/:id', function(req, res) {
    Enrollment.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'we got \'em chief!!'});
    });
  });
};
