var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
 
webdriverio
    .remote(options)
    .init()
    // .url('https://stark-thicket-79965.herokuapp.com')
    .url('http:localhost:3000s')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .pause(1000)
    .setValue('#username', 'future')
    .pause(1000)
    .setValue('#password', 'studio')
    .pause(1000)
    .click('#btnSignIn')
    .pause(2000)
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .pause(2000)
    .end();