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
                    title: 'Referral',
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
}];