///
// Test support functions
///

// Initialize Selenium Webdriver, which is the manager.
const Webdriver = require('selenium-webdriver')

// Initialize Selenium Webdriver for Google Chrome web browser.
const Chrome = require('selenium-webdriver/chrome')

// Initialize helpful Node utilities.
const fs = require("fs");
const path = require("path");
const os = require('os'); 

// Make a new webdriver builder, which is a promise.
//
// This implementation is for Chrome.
//
async function makeDriver(){
    return new Webdriver.Builder()
    .withCapabilities(makeCapabilities())
    .setChromeOptions(makeChromeOptions())
    .forBrowser('chrome')
    .build()
}

// Make driver capabilties for the driver function `withCapabilties`.
//
// This implementation is for Chrome.
//
async function makeCapabilities(){
    return Webdriver.Capabilities.chrome()
}

// Make driver options for the driver function `setChromeOptions`.
//
// This implementation enables parallel Chrome browser drivers,
// by creating different options each time the function is called.
//
async function makeChromeOptions(){
    let remoteDebuggingPort = makeChromeOptionsRemoteDebuggingPort()
    let userDataDir = await makeTemporaryUserDataDir()
    let options = new Chrome.Options()
    options.addArguments([
        `--remote-debugging-port=${remoteDebuggingPort}`,
        `--user-data-dir=${userDataDir}`,
    ])
    return options
}

// Make the next port number for Chrome remote debugging.
//
// The port number starts with env var `PORT` or default 10000.
// The port number increments each time the function is called.
//
// This function is called by `makeChromeOptions`.
//
// This implementation uses a typical JavaScript design pattern
// to create a globally-accessibe variable that auto-increments.
//
var makeChromeOptionsRemoteDebuggingPort = (function () {
    var i = process.env.PORT || 10000
    return function () {
        return i++;
    }
})();

// Make a temporary user data directory in order to
// launch each parallel Chrome browser with its own data.
//
// This function uses the operating system temporary directory,
// and a subfolder name "selenium-webdriver-*" with random text.
//
async function makeTemporaryUserDataDir(){
    return fs.promises.mkdtemp(
        path.join(
            os.tmpdir(), 
            `selenium-webdriver-`
        )
    ).catch(console.error);
}

// Exports
module.exports = {
    makeDriver,
    makeCapabilities,
    makeChromeOptions,
    makeTemporaryUserDataDir,
};
