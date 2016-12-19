//--------------------modules------------------
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var express = require('express');
var app = express();
//-------------------config--------------------
//config files
var db = require('./config/db');
//port config
var port = process.env.PORT || 8080;
//database this credencial is for local database
mongoose.connect(db.url);
//parse verbs
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
//logging
app.use(morgan('dev'));


// routes ==================================================
require('./api/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('rocking on ' + port);

// expose app           
exports = module.exports = app;