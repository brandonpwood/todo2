module.exports = function(app){
  // Handles account creation, deletion, and logging in.
  var path = require('path');

  var mongoose = require('mongoose');
  var User = require('./../database/models/User.js');
  mongoose.connect(app.get('db-port'));


  // Requires valid login before any other handling.
  function requireLogin(req, res, next){
    if(req.user){
      User.findOne({username: req.user.username}, function(err, user){
        if(user && !err){
          if(user.password === req.user.password){
            next()
          }else{
            req.session.reset();
            req.user.reset();
            res.sendFile(path.resolve(__dirname, '..', 'public', 'html', 'index.html'));
          }
        }else{
          req.session.reset();
          req.user.reset();
          res.sendFile(path.resolve(__dirname, '..', 'public', 'html', 'index.html'));
        }
      });
    }else{
      req.session.reset();
      req.user.reset();
      res.sendFile(path.resolve(__dirname, '..', 'public', 'html', 'index.html'));
    }
  }

  // Create Accouunts. Only account function that doesn't require login.
  app.post('/createaccount', function(req, res){
    if(req.body.username && req.body.password){
      // Make sure username doesn't exists
      User.findOne({username: req.body.username}, function(err, user){
        if(!user && !err){
          var user  = new User({
            username: req.body.username,
            password: req.body.password,
            todos: []
          });
          user.save(function(err, newUser){
            if(newUser && !err){
              req.session.user = newUser;
              res.send('Success!');
              console.log("Account Createed: " + newUser.username);
            }else{
              res.send('Server error');
            }
          })
        }else{
          res.send('Username already exists');
        }
      })
    }
  });

  // Account deletion.
  app.post('/deleteaccount', requireLogin, function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(user && !err){
        user.remove();
      }else{
        res.send("Account cannot be deleted at this time.");
      }
    })
  });

  // Login, also doesn't reauire logged in.
  app.post('/login', function(req, res){
    if(req.body.userame && req.body.password){
      User.findOne({username: req.bodu.username}, function(err, user){
        if(user && !err && (user.password === req.body.password)){
          req.user = user;
          delete req.user.todos;
          req.session.user = user;
        }else{
          res.send('Invalid combination');
        }
      });
    }else{
      res.send('Invalid combination');
    }
  });

  // Logout if logged in.
  app.post('/logout', requireLogin, function(req, res){
    res.session.reset();
    res.user.reset();
    res.sendFile(path.resolve('./../public/html/index.html'));
  });

}
