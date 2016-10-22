var roots = require('./root');
var static = require('./static');
var auth = require('./auth');
var prevention = require('./prevention');
var shelter = require('./shelter');
var referral = require('./referral');
var analytics = require('./analytics');
var continuum = require('./continuum');

/** API routes */
var twilio = require('./api/twilio');
var threads = require('./api/threads');

module.exports = [].concat(static, roots, auth, twilio, threads, prevention, shelter, referral, analytics, continuum);

