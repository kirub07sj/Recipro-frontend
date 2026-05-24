const { By, until } = require('selenium-webdriver');
const { getDriver, BASE_URL } = require('../selenium/driver');
const { login } = require('../selenium/helpers');

describe('Basic Responsiveness Test', () => {
    let driver;

    beforeAll(async () => {
        driver = getDriver();
        await driver.get(`${BASE_URL}/login`);
        await login(driver, 'test@example.com', 'TestUser123!');
        await driver.wait(until.urlContains('/dashboard'), 10000);
    });

    test('Mobile viewport simulation', async () => {
        // Set viewport to a typical mobile size (iPhone X: 375x812)
        await driver.manage().window().setRect({ width: 375, height: 812 });
        
        await driver.get(`${BASE_URL}/dashboard`);
        await driver.sleep(1000);

        // Check if layout is still usable by finding basic elements
        // usually the bottom navigation or hamburger menu appears on mobile
        // In Recipro, we have a sidebar or bottom nav
        const bodyText = await driver.findElement(By.tagName('body')).getText();
        expect(bodyText).toBeDefined();

        // Check if a primary button is still accessible
        const navLinks = await driver.findElements(By.css('a'));
        expect(navLinks.length).toBeGreaterThan(0);

        // Reset to desktop viewport for other tests if they run after this
        await driver.manage().window().setRect({ width: 1280, height: 800 });
    });
});
