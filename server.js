var Hapi = require('hapi')
var Good = require('good')
var Hoek = require('hoek')
    /** create a server with a host and port */
var server = new Hapi.Server()
var Routes = require('./routes/index')
    /** requirements for temlates */
var Vision = require('vision')
var Inert = require('inert')
var Handlebars = require('handlebars')
    /** requirements for basic authentication */
var Bcrypt = require('bcrypt')
var BasicAuth = require('hapi-auth-basic')
var CookieAuth = require('hapi-auth-cookie')
var Users = require('./users-db')
var Path = require('path')


server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 3000
})

let serverOptions = {
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout'],
    }
}

server.register([{
    register: Inert
}, {
    register: Vision
}, {
    register: Good,
    options: serverOptions
}, {
    register: BasicAuth
}, {
    register: CookieAuth
}], (err) => {
    Hoek.assert(!err, err);

    /** validation function used for hapi-auth-basic */
    var basicValidation = function(request, username, password, callback) {
        var user = Users[username]

        if (!user) {
            return callback(null, false)
        }

        Bcrypt.compare(password, user.password, function(err, isValid) {
            callback(err, isValid, {
                id: user.id,
                name: user.name
            })
        })
    }

    /** basic auth strategy all routes */
    server.auth.strategy('basic', 'basic', {
        validateFunc: basicValidation
    })

    /** validation function used for hapi-auth-cookie: optional and checks if the user is still existing */
    var sessionValidation = function(request, session, callback) {
        var username = session.username
        var user = Users[username]

        if (!user) {
            return callback(null, false)
        }

        server.log('info', 'user authenticated')
        callback(err, true, user)
    }

    server.auth.strategy('session', 'cookie', true, {
        password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
        cookie: 'home-more',
        redirectTo: '/',
        isSecure: false,
        validateFunc: sessionValidation
    })

    server.log('info', 'Registered auth strategy: cookie auth')

    server.route(Routes)
    server.log('info', 'Routes registered')

    /** set view configuration in plugin register callback */
    server.views({
        engines: {
            html: Handlebars
        },
        path: Path.join(__dirname, 'views'),
        layoutPath: Path.join(__dirname, 'views/layouts'),
        helpersPath: Path.join(__dirname, 'views/helpers'),
        partialsPath: Path.join(__dirname, 'views/partials'),
        layout: 'default',
    });
    server.log('info', 'View configuration completed')

    /** Start the server */
    server.start((err) => {
        Hoek.assert(!err, err);
        server.log('info', 'Running: ' + server.info.uri);
    });
});
