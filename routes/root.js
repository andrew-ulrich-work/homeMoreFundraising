module.exports = [{
        method: 'GET',
        path: '/',
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
                    return reply.redirect('/dashboard');
                }
                var data = {
                    title: 'This is Index!',
                    context: 'home'
                };
                return reply.view('index', data)
            }
        }
    }, {
        method: 'GET',
        path: '/dashboard',
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
                        title: 'This is Index!',
                        user: request.auth.credentials,
                        role: request.auth.credentials.type
                    };
                    return reply.view('dashboard', data)
                }
            }
        }
    }, {
        method: 'GET',
        path: '/settings',
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
                    return reply.view('settings')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/timeline',
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
                    return reply.view('timeline')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/help',
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
                    return reply.view('help')
                }
            }
        }
    }, {
        method: 'GET',
        path: '/charts',
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
                    return reply.view('charts')
                }
            }
        }
    }
    // , {
    //     method: 'GET',
    //     path: '/default',
    //     handler: function(request, reply) {
    //         reply.view('item', {
    //             title: 'Item Title',
    //             body: 'Item Body'
    //         });
    //     }
    // }, {
    //     method: 'GET',
    //     path: '/single',
    //     config: {
    //         auth: {
    //             mode: 'try',
    //         },
    //         plugins: {
    //             'hapi-auth-cookie': {
    //                 redirectTo: false
    //             }
    //         },
    //         handler: function(request, reply) {
    //             reply.view('single', {
    //                 title: 'Item Title',
    //                 body: 'Item Body'
    //             }, {
    //                 layout: 'single'
    //             });
    //         }
    //     }
    // }, {
    //     method: 'GET',
    //     path: '/custom',
    //     config: {
    //         auth: {
    //             mode: 'try',
    //         },
    //         plugins: {
    //             'hapi-auth-cookie': {
    //                 redirectTo: false
    //             }
    //         },
    //         handler: function(request, reply) {
    //             reply.view('item', {
    //                 title: 'Item Title',
    //                 body: 'Item Body'
    //             }, {
    //                 layout: 'custom'
    //             });
    //         }
    //     }
    // }
];