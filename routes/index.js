var users = require('./users');
var static = require('./static');
var auth = require('./auth');

module.exports = [].concat(static,users,auth);