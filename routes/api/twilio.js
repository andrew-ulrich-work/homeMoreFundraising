var client = require('twilio')('AC00b51b98c6f3ab5f17cd49da6e8ad1bf', 'a9c75512745ede9cd6558d647a643e87');
var appNumber = '+15042651484';
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var Message = mongoose.model('Message');
var websocketConn = require('./../../server').websocketConn;

websocketConn.set('match origin protocol', true);

module.exports = [{
    method: 'POST',
    path: '/report',
    config: {
        auth: {
            mode: 'try'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },
    handler: function(req, reply) {
        var number = sanitizeNumber(req.payload.phone);
        console.log('here we are', req.payload)
        if (req.payload.phone && req.payload.issue === 'payment:missed') {
            var message = 'It looks like you have missed a few utility bills. Are you in need of some help? Reply yes or no.';
            client.messages.create({
                to: number,
                from: appNumber,
                body: message,
            }, function(err) {
                saveBotMessageToThread(number, message, function(err) {
                    return reply(err ? 500 : 200);
                });
            });
        } else {
            return reply(400);
        }
    }
}, {
    method: 'POST',
    path: '/sms',
    config: {
        auth: {
            mode: 'try'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },
    handler: function(req, reply) {
        var number = sanitizeNumber(req.payload.From);
        // Save the incoming message into the system
        saveUserMessageToSystem(number, null, req.payload.Body, function(err, thread) {
            // At this point -- figure out what the response should be
            var response = 'Echo: ' + req.payload.Body;
            // Now send out the response
            client.messages.create({
                to: number,
                from: appNumber,
                body: response
            }, function(err) {
                saveBotMessageToExistingThread(thread, response, function(err) {
                    return reply(err ? 500 : 200);
                });
            });
        });
    }
}];
var saveBotMessageToThread = function(phone, message, cb) {
    // First see if there is an existing user with that phone number
    User.findOne({
        phone: phone
    }).exec(function(err, user) {
        if (err) {
            console.log('something went wrong trying to find a user by their phone number');
            cb(err);
            // If not, create the user with that phone number
        } else if (!user) {
            User.create({
                type: 'client',
                phone: phone
            }, function(err, user) {
                findThread(user);
            });
        } else if (user) {
            findThread(user);
        }

        function findThread(user) {
            // Find the thread which correpsonds to the user w/ matching phone number
            Thread.findOne({
                client: user._id
            }).exec(function(err, thread) {
                if (err) {
                    console.log('something went wrong trying to find a thread by the user id');
                    cb(err);
                    // If nothing is found, create a new thread for the client
                } else if (!thread) {
                    Thread.create({
                        client: user._id
                    }, function(err, thread) {
                        saveBotMessageToExistingThread(thread, message, cb);
                    });
                } else if (thread) {
                    console.log('we found an existing thread to save the bot message to')
                    saveBotMessageToExistingThread(thread, message, cb);
                }
            });
        }
    });
}
var saveBotMessageToExistingThread = function(thread, message, cb) {
    User.findOne({
        type: 'bot'
    }).exec(function(err, bot) {
        var data = {
            thread: thread._id,
            author: bot._id,
            message: message
        };
        Message.create(data, function(err) {
            data.author = bot;
            shipMessageToClient(data);
            cb(err);
        });
    });
}
var saveUserMessageToSystem = function(phone, err, message, cb) {
    if (!err) {
        // First see if there is an existing user with that phone number
        User.findOne({
            phone: phone
        }).exec(function(err, user) {
            if (err) {
                console.log('something went wrong trying to find a user by their phone number');
                cb(err);
                // If not, create the user with that phone number
            } else if (!user) {
                User.create({
                    type: 'client',
                    phone: phone
                }, function(err, user) {
                    findThread(user);
                });
            } else if (user) {
                findThread(user);
            }

            function findThread(user) {
                // Find the thread which correpsonds to the user w/ matching phone number
                Thread.findOne({
                    client: user._id
                }).exec(function(err, thread) {
                    if (err) {
                        console.log('something went wrong trying to find a thread by the user id');
                        cb(err);
                        // If nothing is found, create a new thread for the client
                    } else if (!thread) {
                        Thread.create({
                            client: user._id
                        }, function(err, thread) {
                            saveMessage(user, thread);
                        });
                    } else if (thread) {
                        saveMessage(user, thread);
                    }
                    // Save the new message into the proper thread
                    function saveMessage(user, thread) {
                        var data = {
                            thread: thread._id,
                            author: user._id,
                            message: message
                        };
                        Message.create(data, function(err) {
                            data.author = user;
                            shipMessageToClient(data);
                            cb(err, thread);
                        });
                    }
                });
            }
        });
    }
}

function shipMessageToClient(message) {
    message.created = new Date();
    console.log('emitting message');
    websocketConn.emit('message', message);
}

function sanitizeNumber(num) {
    var clean = num.replace(/[^0-9]/g, '');
    return clean.length > 10 ? clean.slice(-10) : clean;
}