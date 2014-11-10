
'use strict';

//include node modules
var mongoose = require('mongoose');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var url = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/hasMany_dev';

app.use(bodyparser.json());
mongoose.connect(url);

//require routes
require('./routes/students_routes')(app);
require('./routes/sections_routes')(app);
require('./routes/enrollments_routes')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server is running on port %d', app.get('port'));
});
