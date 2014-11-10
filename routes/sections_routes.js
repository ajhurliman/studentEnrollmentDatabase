'use strict';
var Section = require('../models/Section');

module.exports = function(app) {
  //create a section
  app.post('/api/sections', function(req, res) {
    var section = new Section(req.body);
    section.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //read a section
  app.get('/api/sections/:id', function(req, res) {
    Section.findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //update a section
  app.put('/api/sections/:id', function(req, res) {
    var section = req.body;
    delete section._id;
    Section.findOneAndUpdate({_id: req.params.id}, section, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  //destroy a section
  app.delete('/api/sections/:id', function(req, res) {
    Section.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'we got \'em chief!!'});
    });
  });
};
