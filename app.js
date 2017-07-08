/*
Todo2
Started 7/6/17
Brandon Wood
Redesigned with socket.io for chats, a new, single-page app with bootstrap,
and no view engine.
*/
var express = require('express');
var app = express();
//Utilities
var bodyParser = require('body-parser');
var session = require('client-sessions');
// Database
var mongoose = require('mongoose');
var User = require('./database/models/User.js');

// Ports
app.set('port', 8000 || env.PORT);
app.set('db-port', 'mongodb://127.0.0.1/todo');

// Middleware
app.use(express.static('./public'));

// Req parsing
app.use(bodyParser.urlencoded({extended: false}));

// Sessions
app.use(session({
  cookieName: 'session',
  secret: 'N0TT H3 R344134314141241LLL Str1asdfng',
  duration: 1000 * 60 * 5,
  activeDuration: 1000 * 60 * 5
}));

// Initialize connection
mongoose.connect(app.get('db-port'));

// Always update sessions
app.use(function(req, res, next){
  if(req.session && req.session.user){
    User.findOne({username: req.session.user.username}, function(err, user){
      if(user && !err){
        req.user = user;
        delete req.user.password;
        req.session.user = user;
      }
      next();
    });
  }else{
    next();
  }
});

// Gather controllers
var accountController = require('./controllers/accountController.js');
var routingController = require('./controllers/routingController.js');
var miscController = require('./controllers/miscController.js');

// Fire controllers
accountController(app);
routingController(app);
miscController(app);

// Listen
app.listen(app.get('port'), function(){
  console.log("listening on port " + app.get('port') + '...');
});
