const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Singleton driver instance
let driver = null;

const createDriver = async () => {
    if (!driver) {
        const options = new chrome.Options();
        // Optional headless mode
        // options.addArguments('--headless=new');
        options.addArguments('--window-size=1280,800');
        options.addArguments('--disable-gpu');
        options.addArguments('--no-sandbox');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }
    return driver;
};

const getDriver = () => driver;

const quitDriver = async () => {
    if (driver) {
        await driver.quit();
        driver = null;
    }
};

module.exports = {
    createDriver,
    getDriver,
    quitDriver,
    BASE_URL: 'http://localhost:5173' // Vite default port used by Recipro
};
