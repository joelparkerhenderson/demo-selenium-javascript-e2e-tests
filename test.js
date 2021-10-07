#!/usr/bin/env node
'use strict'

///
// Demo of Selenium JavaScript E2E tests
//
// Demonstration of Selenium JavaScript end-to-end tests,
// using a simple test runner script that calls test files.
//
// Setup:
//
// ```sh
// node install
// ```
//
// Syntax:
//
// ```sh
// ./test.js
// ```
//
// Example using a typical top level project directory:
//
// ```sh
// ./test/e2e/test.js
// ```
//
// Environment variables:
//
//   * `PORT`: the base port number for opening browsers; default is 10000
//
//
// ## Repository organization
//
// This repository has three essential areas:
//
//   * `test.js` is the test runner that reads individual test files
//
//   * `test_*.js` are the individual test files for end-to-end tests
//
//   * `support.js` has helpers and utilties for launching browsers
//
//
// ## What this script does
//
// This script reads its directory to find test files to require;
// test files must have names that begin with "test_" and end with ".js".
//
// For each test file, this script launches a new driver, in parallel,
// then calls the test file's function `test(…)` with this signature:
//
// ```js
// module.exports = async function test(index) …
// ```
//
// Example test file:
//
// ```js
// const support = require('./support')
// const assert = require('assert')
// const {By, Key} = require('selenium-webdriver')
//
// module.exports = async function test(index){
//
//     // Launch a web browser
//     let driver = await support.makeDriver()
//
//     // Go to a web page
//     await driver.get("https://example.com")
//
//     // Verify the headline
//     let headline = await driver.findElement(By.tagName("h1")).getText()
//     assert.equal(headline, "Example search page")
//
//     // Find the search box, then type "kittens", then press return.
//     await driver.findElement(By.name("q")).sendKeys("kittens", Key.RETURN)
//
//     // Is the results page title correct?
//     let title = await driver.getTitle()
//     assert.equal(title, "Example results for kittens")
//
// }
// ```
//
// ## Tracking
//
//   * Package: demo-selenium-javasript-e2e-tests
//   * Version: 2.0.0
//   * Created: 2019-11-02T00:00:00Z
//   * Updated: 2021-10-08T00:19:55Z
//   * License: GPL-2.0-or-greater or for custom license contact us
//   * Contact: Joel Parker Henderson (joel@joelparkerhenderson.com)
///
 
// Read a directory recursively.
const readdirp = require('readdirp');

// Process all the test files in the test directory.
async function test(){
    var index = 0;
    for await (const entry of readdirp(__dirname, { 
        fileFilter: 'test_*.js', 
        directoryFilter: [ '!.*', '!node_modules' ] 
    })) {
        console.info(`${index} ${entry.fullPath}`);
        let test = require(entry.fullPath)
        await test(index)
        index += 1
    }
}

test()
