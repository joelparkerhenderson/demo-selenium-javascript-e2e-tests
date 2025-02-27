# Demo of Selenium JavaScript E2E tests

Demonstration of Selenium JavaScript end-to-end tests,
using a simple test runner script that calls test files.

Setup:

```sh
node install
```

Syntax:

```sh
./test.js
```

Example using a typical top level project directory:

```sh
./test/e2e/test.js
```

Environment variables:

  * `PORT`: the base port number for opening browsers; default is 10000

## Repository organization

This repository has three essential areas:

  * `test.js` is the test runner that reads individual test files

  * `test_*.js` are the individual test files for end-to-end tests

  * `support.js` has helpers and utilties for launching browsers

## What this script does

This script reads its directory to find test files to require;
test files must have names that begin with "test_" and end with ".js".

For each test file, this script launches a new driver, in parallel,
then calls the test file's function `test(…)` with this signature:

```js
module.exports = async function test(index) …
```

Example test file:

```js
const support = require('./support')
const assert = require('assert')
const {By, Key} = require('selenium-webdriver')

module.exports = async function test(index){

    // Launch a web browser
    let driver = await support.makeDriver()

    // Go to a web page
    await driver.get("https://example.com")

    // Verify the headline
    let headline = await driver.findElement(By.tagName("h1")).getText()
    assert.equal(headline, "Example search page")

    // Find the search box, then type "kittens", then press return.
    await driver.findElement(By.name("q")).sendKeys("kittens", Key.RETURN)

    // Is the results page title correct?
    let title = await driver.getTitle()
    assert.equal(title, "Example results for kittens")

}
```


## Install 

Install Node and NPM as usual. 

If you need help with this, then see [demo-selenium-javascript](https://github.com/joelparkerhenderson/demo-selenium-javascript)


### Install Selenium and Google Chrome Driver

Install Selenium WebDriver:

```sh
npm install --save selenium-webdriver
```

Install Google Chrome driver:

```sh
npm install --save chromedriver
```

### Install helpful Node utilities

Recursive read directory with streams:

```
npm install --save readdirp
```

Construct pipes of streams of events:

```
npm install --save event-stream
```

## Run

Run:

```sh
./test.js
```

Or you can run with Node explicity:

```sh
node test.js
```

## Update

Run:

```sh
npm install -g npm-check-updates
ncu -u 
npm install
```

## Tracking

  * Package: demo-selenium-javascript-e2e-tests
  * Version: 2.0.1
  * Created: 2019-11-02T00:00:00Z
  * Updated: 2025-02-11T23:48:54Z
  * License: GPL-2.0-or-greater or for custom license contact us
  * Contact: Joel Parker Henderson (joel@joelparkerhenderson.com)
