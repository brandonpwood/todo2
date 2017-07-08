module.exports = function(app){
  var path = require('path');

  app.use(function(req,res, next){
    console.log('Failed request made at ' +  req.url);
    res.sendFile(path.resolve(__dirname, '..', 'public', 'html', '404.html'));
  });

  app.use(function(req, res, next, error){
    console.log('Server error: ' + error);
    res.sendFile(path.resolve(__dirname, '..', 'public', 'html', '500.html'));
  });
}
