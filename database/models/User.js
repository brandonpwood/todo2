var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  todos: Array
});

var user = mongoose.model('user', userSchema);

module.exports = user;
