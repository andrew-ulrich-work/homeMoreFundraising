module.exports = [{
    method: 'GET',
    path: '/js/{file*}',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: {
            directory: {
                path: 'public/js'
            }
        }
    }
}, {
    method: 'GET',
    path: '/css/{file*}',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: {
            directory: {
                path: 'public/css'
            }
        }
    }
}, {
    method: 'GET',
    path: '/img/{file*}',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: {
            directory: {
                path: 'public/img'
            }
        }
    }
}, {
    method: 'GET',
    path: '/fonts/{file*}',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: {
            directory: {
                path: 'public/fonts'
            }
        }
    }
}];