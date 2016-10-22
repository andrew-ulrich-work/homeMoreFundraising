# Hapi -- Get Your Server Up and Running Series Overview

Create a package.json file.

```
$ npm init
```

Create a README.md

```
touch README.md
```

Install and save Hapi module

```
$ npm install -S hapi
```

## Server

Create a new file called server.js

```
touch server.js
```

Paste boilerplate

```
var Hapi = require('hapi')

// create a server with a host and port
var server = new Hapi.Server()

// add server’s connection information
server.connection({  
  host: 'localhost',
  port: 3000,
  labels: ['name']
})

// start your server
server.start(function(err) {  
  if (err) {
    throw err
  }

  console.log('Server running at: ', server.info.uri)
})
```

## Routes

```
// add “hello world” route
server.route({  
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello Future Studio!')
  },
  config: {
      description: 'Sends a friendly greeting!',
      notes: 'No route parameters available',
      tags: ['greeting']
  }
})
```

## Plugins

### Add Console Output as a Plugin

```
$ npm install good -S
$ npm install good-console -S
$ npm install good-squeeze -S
$ npm install -S Hoek
```

Register the reporter

```
var Good = require('good')
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
```

### Register and start

```
var Hoek = require('hoek')

server.register({
    register: Good,
    options: serverOptions
}, (err) => {
    Hoek.assert(!err, err);
    // Start the server
    server.start((err) => {
        Hoek.assert(!err, err);
        server.log('Velocity Maps is running at:', server.info.uri);
    });
});
```

### Create custom Plugins

```
var baseRoutes = {
  register: function (server, options, next) {
    // add “hello world” route
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Hello Future Studio!')
      }
    })

    next()
  }
}

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
}

module.exports = baseRoutes
```

### How to Serve Static Files (Images, JS, CSS, etc.)

Install Inert

```
$ npm install inert -S
```

Add to register block

```
 register: require('inert')
```

#### Send a file

```
server.route({  
  method: 'GET',
  path: '/mylocaljavascript.js',
  handler: {
    // reply.file() expects the file path as parameter
    reply.file('../path/to/my/localjavascript.js')
  }
})
```

#### Serve Files From a Directory

```
server.route({  
  method: 'GET',
  path: '/js/{file*}',
  handler: {
    directory: {
      path: 'public/js'
    }
  }
})
```

The directory handler has further options, like:

- showHidden: that determines if hidden files can be served
- redirectToSlash: determines that requests without trailing slash get redirected to the "with slash pendant", which is useful for the resolution of relative paths
- lookupCompressed: tells the file processor to search for the requested file in compressed .gz version
- etagMethod: defines the method to calculate the ETag header. Please find more details about the directory options within the inert GitHub repository.

#### How to render views

Install from npm and save

```
$ npm install -S vision
$ npm install -S handlebars
```

```
var Vision = require('vision')
```

Create folder structure and sequence of osx commands

```
$ mkdir views
$ cd views
$ mkdir helpers
$ mkdir partials
$ mkdir layout
$ touch index.html
$ cd layout
$ touch default.html
$ cd ../partials
$ touch header.html
$ touch footer.html
```

```
views/  
    helpers/
    partials/
        header.html
        footer.html
    layout/
        default.html
    index.html
server.js
```

Include view on server.js register, prior to server.start

```
/** set view configuration in plugin register callback */
server.views({
    engines: {
        html: Handlebars
    },
    path: __dirname + '/views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials'
});
```

```
// add “hello world” route
server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        // Render the view with the custom greeting
        var data = {
            title: 'This is Index!',
            message: 'Hello, World. You crazy handlebars layout'
        };

        return reply.view('index', data);
    }
})
```

## How to Reply a JSON Response

The reply interface accepts multiple types (e.g. string, buffer, stream, JSON serializable object) as payload. And that means, we can use any regular JavaScript object as an argument for reply() and hapi will automatically convert it into valid JSON.

```
server.route({  
  method: 'GET',
  path: '/json',
  handler: function (request, reply) {
    var data = {
      key: 'value',
      another: false,
      number: 10,
      func: function() {
        return this.number * 10
      }
    }

    reply(data)
  }
})
```

## Basic Authentication With Username and Password

### Authentication in Hapi

The concept of authentication in hapi is based on schemes and strategies. Picture yourself that schemes are general types of authentication like basic or digest. In reference, a strategy is the actual named instance or implementation of an authentication scheme.

As of now, it's important to know that hapi uses a scheme and strategy mechanism for authentication.

### Basic Authentication With Hapi

```
npm i -S hapi-auth-basic
```

register hapi-auth-basic then define it as an available authentication mechanism, in server.js.

```
var BasicAuth = require('hapi-auth-basic')

// register plugins to server instance
server.register(BasicAuth, function (err) {
  server.auth.strategy('simple', 'basic', { validateFunc: // TODO })
})
```

Internally, the plugin defines a new scheme named basic to your hapi server by calling server.auth.scheme().

To create an authentication strategy for your hapi server, leverage the server.auth.strategy(name, scheme, options) function that expects three (optionally four) parameters:

- name: your strategy name that will be used throughout your app
- scheme: the scheme name on which the strategy is based upon (e.g. basic)
- options: additional options

### Hapi Basic Authentication -- Options

The following list outlines available options to customize the behavior of hapi-auth-basic:

- validateFunc: a required function that will check the provided credentials against your user database
- allowEmptyUsername: boolean value that indicates whether users are allowed to make requests without a username; defaults to false
- unauthorizedAttributes: object that will be passed to Boom.unauthorized if set. If there's a custom error defined, this object will be ignored in favor of the custom error data; defaults to undefined

There's a required option that you need to provide: validateFunc. That's a function with the signature function(request, username, password, callback), where

- request: is the hapi request object which requires authentication
- username: username send by the client
- password: password send by the client
- callback: with the signature function(err, isValid, credentials), where:
- err: internal error object that replaces the default Boom.unauthorized if defined
- isValid: boolean that indicates if the username was found and passwords match
- credentials: user's credentials, only included if isValid is true

The following section will show you an exemplary validation function.

### Validate User Credentials

Routes that require authentication will be checked against the defined authentication strategy using the provided validation function.

For the password comparison within the exemplary validation function, you're leveraging the bcrypt library and its provided functionality. If you want to use bcrypt for your project as well, install and add it as a project dependency:

```
npm i -S bcrypt
```

The following code snippet is just for illustration purposes and uses a hard-coded users object. Actually, you would query your database for a username match and compare the provided passwords.

```
var Bcrypt = require('bcrypt')

// hardcoded users object … just for illustration purposes
var users = {  
  movie: {
    id: '1',
    username: 'movie',
    password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG'  // 'studio'
  }
}

// validation function used for hapi-auth-basic
var basicValidation  = function (request, username, password, callback) {  
  var user = users[ username ]

  if (!user) {
    return callback(null, false)
  }

  Bcrypt.compare(password, user.password, function (err, isValid) {
    callback(err, isValid, { id: user.id, username: user.username })
  })
}
```

Notice: Bcrypt.compare(candidate_plain_text_password, hash, callback) compares the candidate password provided in plain text with a given hash. You don't need to hash your candidate before checking if they match.

### Route Configuration to Require Authentication

Hapi doesn't require authentication for every route by default. You have to secure them individually and you're free to choose from multiple authentication strategies if you're using more than one.

Defining authentication for a route requires you to provide a config object for the route. Previously, you would set the method, path and handler for a route. Now the handler moves into the config object. To ultimately set the authentication mechanism for a route, put your desired strategy name as a string value to the auth field.

```
server.route({  
  method: 'GET',
  path: '/private-route',
  config: {
    handler: function (request, reply) {
      reply('Yeah! This message is only available for authenticated users!')
    }
  }
})
```

As you can see, the route's config object has the auth field set to the previously registered authentication strategy name simple. Specify the handler function within the config object aside the auth field.

## Cookie authentication

```
$ npm install -S hapi-auth-cookie
```

```
{
    register: CookieAuth
  }
```

```


  // validation function used for hapi-auth-cookie: optional and checks if the user is still existing
  var validation = function (request, session, callback) {
    var username = session.username
    var user = Users[ username ]

    if (!user) {
      return callback(null, false)
    }

    server.log('info', 'user authenticated')
    callback(err, true, user)
  }

  server.auth.strategy('session', 'cookie', true, {
    password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
    cookie: 'future-studio-hapi-tutorials-cookie-auth-example',
    redirectTo: '/',
    isSecure: false,
    validateFunc: validation
  })

  server.log('info', 'Registered auth strategy: cookie auth')

  var routes = require('./cookie-routes')
  server.route(routes)
```
