module.exports = function(app){
  var path = require('path');

  app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '..', 'public', 'html', 'index.html'));
  })
}
