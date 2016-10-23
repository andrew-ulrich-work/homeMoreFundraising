module.exports = [{
    method: 'GET',
    path: '/cases',
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
                    title: 'Cases',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    prevention: 'active'
                };
                return reply.view('prevention', data, {
                    layout: 'default'
                })
            }
        }
    }
},{
    method: 'GET',
    path: '/cases/{uuid}',
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
                    title: 'Cases',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    prevention: 'active',
                    infoUri: request.server.info.uri
                };
                
                return reply.view('prevention-single', data, {
                    layout: 'default'
                })
            }
        }
    }
}];