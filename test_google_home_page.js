import * as support from './support.js';
import assert from 'assert';
import {By, Key} from 'selenium-webdriver';

export default async function (index){
    // Launch a web browser
    let driver = await support.makeDriver()
    await driver.get("https://google.com")

    // Is the title correct?
    let title = await driver.getTitle()
    assert.equal(title, "Google")

    // Do these links exist? This demonstrates `linkText`.
    await driver.findElement(By.linkText("About"))
    await driver.findElement(By.linkText("Store"))
    await driver.findElement(By.linkText("Gmail"))
    await driver.findElement(By.linkText("Images"))

    // Do these buttons exist? This demonstrates `xpath`.
    await driver.findElement(By.xpath("//input[@type='submit' and @name='btnK' and @value='Google Search']"))
    await driver.findElement(By.xpath("//input[@type='submit' and @name='btnI' and @value=\"I'm Feeling Lucky\"]"))
}
