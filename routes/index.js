var roots = require('./root');
var static = require('./static');
var auth = require('./auth');
var prevention = require('./prevention');
var shelter = require('./shelter');
var referral = require('./referral');
var analytics = require('./analytics');
module.exports = [].concat(static, roots, auth, prevention, shelter, referral, analytics);