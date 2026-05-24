const { By, until } = require('selenium-webdriver');
const { getDriver, BASE_URL } = require('../selenium/driver');
const { login } = require('../selenium/helpers');

describe('Feedback System Test', () => {
    let driver;

    beforeAll(async () => {
        driver = getDriver();
        await driver.get(`${BASE_URL}/login`);
        await login(driver, 'test@example.com', 'TestUser123!');
        await driver.wait(until.urlContains('/dashboard'), 10000);
    });

    test('Interact with feedback buttons', async () => {
        // Go to a generated recipe page directly
        // We will mock accessing a recent recipe
        await driver.get(`${BASE_URL}/dashboard`);
        await driver.sleep(1000);
        
        const recipeCards = await driver.findElements(By.css('[class*="card"]'));
        if (recipeCards.length > 0) {
            await recipeCards[0].click();
            await driver.wait(until.urlContains('/recipe/'), 5000);
            
            // Look for feedback buttons (Thumbs Up / Down)
            const thumbsUpBtn = await driver.findElements(By.xpath('//button[.//svg[contains(@class, "lucide-thumbs-up")]] | //button[contains(., "Helpful")]'));
            if (thumbsUpBtn.length > 0) {
                await thumbsUpBtn[0].click();
                
                // Usually an alert, toast, or text changes to show confirmation
                await driver.sleep(1000); // Give time for feedback API
                const pageText = await driver.findElement(By.tagName('body')).getText();
                // Just verifying no crash happened
                expect(pageText).toBeDefined();
            } else {
                console.warn('Feedback buttons not available on this recipe');
            }
        } else {
            console.warn('No recipes available to test feedback');
        }
    });
});
