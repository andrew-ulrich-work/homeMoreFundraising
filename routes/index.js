var roots = require('./root');
var static = require('./static');
var auth = require('./auth');

module.exports = [].concat(static,roots,auth);