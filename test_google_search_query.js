const support = require('./support')
const assert = require('assert')
const {By, Key} = require('selenium-webdriver')

module.exports = async function test(index){
    // Launch a web browser
    let driver = await support.makeDriver()
    await driver.get("https://google.com")

    // Find the search box, then type "kittens", then press return.
    await driver.findElement(By.name("q")).sendKeys("kittens",Key.RETURN);

    // Is the results page title correct?
    let title = await driver.getTitle()
    assert.equal(title, "kittens - Google Search", "search query results page title")
}
