var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
 
let pause = 2000,
long_pause = 8000,
med_pause = 5000

webdriverio
    .remote(options)
    .init()
    .url('https://stark-thicket-79965.herokuapp.com')
    .pause(pause)
    
    .setValue('#username', 'future')
    .pause(pause)
    
    .setValue('#password', 'studio')
    .pause(pause)
    
    .click('#btnSignIn')
    .pause(pause)
    
    .click('body > div > div > div.col-xs-2.sidebar > ul > li:nth-child(2) > a')
    .pause(pause)
    

    .click('body > div > div > div.col-sm-9.offset-sm-3.col-md-10.offset-md-2.main > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a > span')
    .pause(pause)

    .click('body > div > div > div.col-xs-2.sidebar > ul > li:nth-child(3) > a')
    .pause(pause)

    .click('#map > div > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(3) > div:nth-child(1)')
    .pause(med_pause)    
    
    .click('body > div > div > div.col-xs-2.sidebar > ul > li:nth-child(4) > a')
    .pause(pause)

    .click('#task-table-filter')
    .pause(pause)

    .setValue('#task-table-filter', 'City')
    .pause(med_pause)

    .click('body > div > div > div.col-xs-2.sidebar > ul > li:nth-child(5) > a')
    .pause(pause)
    

    .click('#task-table-filter')
    .pause(med_pause)

    .setValue('#task-table-filter', 'St. Louis')
    .pause(med_pause)

    .click('body > div > div > div.col-xs-2.sidebar > ul > li:nth-child(6) > a')
    .pause(med_pause)

    .scroll('body > div > div > div.col-sm-9.offset-sm-3.col-md-10.offset-md-2.main > section:nth-child(4) > div')
    .pause(med_pause)

    .scroll('body > div > div > div.col-sm-9.offset-sm-3.col-md-10.offset-md-2.main > section:nth-child(7) > div > h2')
    .pause(med_pause)
    

    .click('#navbar > nav > a')
    .pause(med_pause)

    .setValue('#username', 'user')
    .pause(pause)
    
    .setValue('#password', 'studio')
    .pause(pause)
    
    .click('#btnSignIn')
    .pause(med_pause)

    .click('#formNext')
    .pause(med_pause)

    .setValue('#firstName', 'John')
    .pause(pause)

    .setValue('#lastName', 'Wayne')
    .pause(pause)
    
    .setValue('#phoneNumber', '123.456.8965')
    .pause(pause)

    .click('#formSubmit')
    .pause(med_pause)

    .end();