import * as support from './support.js';
import assert from 'assert';
import {By, Key} from 'selenium-webdriver';

export default async function (index){
    // Launch a web browser
    let driver = await support.makeDriver()
    await driver.get("https://google.com")

    // Find the search box, then type "kittens", then press return.
    await driver.findElement(By.name("q")).sendKeys("kittens",Key.RETURN);

    // Is the results page title correct?
    let title = await driver.getTitle()
    assert.equal(title, "kittens - Google Search", "search query results page title")
}
