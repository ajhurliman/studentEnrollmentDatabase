'use strict';
var Student = require('../models/Student');

module.exports = function(app) {
  //Create a student
  app.post('/api/students', function(req, res) {
    var student = new Student(req.body);
    student.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //Read a student's name
  app.get('/api/students/:id', function(req, res) {
    Student.findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //Update a student
  app.put('/api/students/:id', function(req, res) {
    var student = req.body;
    delete student._id;
    Student.findOneAndUpdate({_id: req.params.id}, student, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //Destroy a student
  app.delete('/api/students/:id', function(req, res) {
    Student.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
  });
};
