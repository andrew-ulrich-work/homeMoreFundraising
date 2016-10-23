var Mongoose = require('mongoose');
var User = Mongoose.model('User');
module.exports = [{
    method: 'GET',
    path: '/referral',
    config: {
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                var data = {
                    title: 'Resources',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    referral: 'active'
                };
                return reply.view('referral', data, {
                    layout: 'default'
                })
            }
        }
    }
}, {
    method: 'POST',
    path: '/referral',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            User.create({
                type: 'client',
                firstname: request.payload.firstname,
                lastname: request.payload.lastname,
                phone: request.payload.phonenumber
            }, function(err, user) {
                reply.redirect('/shelter')
            });
        }
    }
}];