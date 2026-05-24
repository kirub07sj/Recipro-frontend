const { By, Key, until } = require('selenium-webdriver');
const { getDriver, BASE_URL } = require('../selenium/driver');
const { login, waitForElement } = require('../selenium/helpers');

describe('Recipe Generation Flow', () => {
    let driver;

    beforeAll(async () => {
        driver = getDriver();
        await driver.get(`${BASE_URL}/login`);
        await login(driver, 'test@example.com', 'TestUser123!');
        await driver.wait(until.urlContains('/dashboard'), 10000);
    });

    test('Full Recipe Generation Workflow', async () => {
        // 1. Go to Generate Recipe page
        await driver.get(`${BASE_URL}/generate`);
        
        // 2. Enter ingredients
        const input = await waitForElement(driver, By.css('input[placeholder="Add an ingredient manually..."]'));
        await input.sendKeys('chicken', Key.RETURN);
        await driver.sleep(500); // Wait for state update
        await input.sendKeys('rice', Key.RETURN);
        await driver.sleep(500);

        // 3. Generate recipe
        // Wait for generate button and click
        const generateBtn = await driver.findElement(By.xpath('//button[contains(text(), "Generate Recipe") or contains(text(), "Create Recipe")]'));
        await generateBtn.click();

        // 4. Wait for recipe generation to complete
        // This might take a while if it hits an AI backend
        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes('/recipe/') && !url.includes('/generate');
        }, 30000); // 30 seconds timeout for AI generation
        
        // 5. Verify elements on the page
        const pageText = await driver.findElement(By.tagName('body')).getText();
        
        // Should have ingredients section
        expect(pageText.toLowerCase()).toContain('ingredients');
        
        // Should have instructions or method
        expect(pageText.toLowerCase()).toContain('instructions');
        
        // Should have nutrition
        expect(pageText.toLowerCase()).toContain('nutrition');
    });
});
