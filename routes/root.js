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
                    return reply.view('dashboard')
                }
                reply.view('index', {
                    title: 'Item Title'
                })
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