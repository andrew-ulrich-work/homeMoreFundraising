var passport = require('passport');

module.exports = function(app) {

    /* Traditional Login */
    app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
}