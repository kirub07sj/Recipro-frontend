const { By, until } = require('selenium-webdriver');

const waitForElement = async (driver, selector, timeout = 10000) => {
    return await driver.wait(until.elementLocated(selector), timeout);
};

const typeInput = async (driver, selector, text) => {
    const element = await waitForElement(driver, selector);
    // clear the input first
    await element.clear();
    await element.sendKeys(text);
};

const clickButton = async (driver, selector) => {
    const element = await waitForElement(driver, selector);
    await driver.wait(until.elementIsVisible(element), 5000);
    await driver.wait(until.elementIsEnabled(element), 5000);
    await element.click();
};

const login = async (driver, email, password) => {
    await typeInput(driver, By.css('input[placeholder="Email address"]'), email);
    await typeInput(driver, By.css('input[placeholder="Password"]'), password);
    await clickButton(driver, By.css('button[type="submit"]'));
};

const findElementWithText = async (driver, cssSelector, text) => {
    const elements = await driver.findElements(By.css(cssSelector));
    for (const el of elements) {
        const elText = await el.getText();
        if (elText.includes(text)) {
            return el;
        }
    }
    throw new Error(`Element with selector ${cssSelector} and text "${text}" not found`);
};

module.exports = {
    waitForElement,
    typeInput,
    clickButton,
    login,
    findElementWithText
};
