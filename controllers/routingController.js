module.exports = function(app){
  //Handles the one and only route.
  var path = require('path');

  var mongoose = require('mongoose');
  var User = require('./../database/models/User.js');
  var Todo = require('./../database/models/Todo.js');
  mongoose.connect(app.get('db-port'));

  // Get a json from an array of json from its time proerty.
  function findByTime(list, time){
    list.forEach(function(item){
       if(item.time === time){
         return time;
       }
    });
  }


  // Requires valid login before any other handling. Send nothing instead of login
  // to avoid recusive calls.
  function requireLogin(req, res, next){
    if(req.user){
      User.findOne({username: req.user.username}, function(err, user){
        if(user && !err){
          if(user.password === req.user.password){
            next()
          }else{
            req.session.reset();
            req.user.reset();
            res.send();
          }
        }else{
          req.session.reset();
          req.user.reset();
          res.send();
        }
      });
    }else{
      req.session.reset();
      req.user.reset();
      res.send();
    }
  }

  // Routing for index.
  app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '..', 'public', 'html', 'index.html'));
  });

  // Send data if logged in front end loads into page.
  app.get('/data', requireLogin, function(req, res){
    User.findOne({username: req.user.username}, function(err, user){
      if(user && !err){
        var todos = []
        user.todos.forEach(function(todo){
          Todo.findOne({_id: todo}, function(err, actualTodo){
            if(actualTodo && !err){
              todos.push(todo);
            }
          });

          res.send(todos);
        });
      }
    });
  });

  // Update if logged in. Always sent on page close or reload.
  app.get('/update', requireLogin, function(req, res){
    if(req.body.deletedTodos && req.body.updatedTodos && req.body.newTodos){
      // Save user's todos, make a list of new todos and deleted ones.
      var newTodos = req.body.newTodos;
      var deletedTodos = req.body.deletedTodos;
      var updatedTodos = req.body.updatedTodos;

      User.findOne({username: req.user.username}, function(err, user){
          if(user && !err){
            deletedTodos.forEach(function(time){
              user.todos.splice(user.todos.indexOf(time), 1);
            });
            newTodos.forEach(function(time){
              user.todos.push(time);
            });
            user.save();
          }
          newTodos.forEach(function(time){
            newTodo = new Todo(findByTime(req.body.Todos, time));
            newTodo.save();
          });
          deletedTodos.forEach(function(time){
            Todo.remove({time: time});
          });
          updatedTodo.forEach(function(time){
            var todo = findByTime(req.body.todos, time);
            Todo.findOne({time: time}, function(err, oldTodo){
              oldTodo.contents = todo.contents;
              oldTodo.save();
            });
          });
      });
    }
  });
}
