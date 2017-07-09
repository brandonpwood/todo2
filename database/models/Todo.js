var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  name: String,
  time: String,
  users: Array,
  contents: Array
});

var todo = mongoose.model('todo', todoSchema);

module.exports = todo;
