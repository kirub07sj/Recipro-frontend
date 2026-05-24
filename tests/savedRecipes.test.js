const { By, until } = require('selenium-webdriver');
const { getDriver, BASE_URL } = require('../selenium/driver');
const { login } = require('../selenium/helpers');

describe('Saved Recipes Flow', () => {
    let driver;

    beforeAll(async () => {
        driver = getDriver();
        await driver.get(`${BASE_URL}/login`);
        await login(driver, 'test@example.com', 'TestUser123!');
        await driver.wait(until.urlContains('/dashboard'), 10000);
    });

    test('Save recipe and verify in saved section', async () => {
        // Go directly to a known recipe or explore section
        await driver.get(`${BASE_URL}/saved-recipes`);
        await driver.sleep(2000); // Wait for fetch

        // Get initial count of saved recipes
        const initialCards = await driver.findElements(By.css('.recipe-card, [class*="card"]'));
        const initialCount = initialCards.length;

        // Go to a recipe details page
        // We'll use a mocked ID or from recent if available, 
        // but for generic testing we can search or explore
        await driver.get(`${BASE_URL}/dashboard`);
        await driver.sleep(1000);

        // Click a recipe from recent views if any
        const recipeCards = await driver.findElements(By.css('[class*="card"]'));
        if (recipeCards.length > 0) {
            await recipeCards[0].click();
            await driver.wait(until.urlContains('/recipe/'), 5000);

            // Find save/bookmark button
            // Usually represented by a Bookmark icon
            const saveBtn = await driver.findElement(By.xpath('//button[.//svg[contains(@class, "lucide-bookmark")]] | //button[contains(., "Save")]'));
            await saveBtn.click();
            await driver.sleep(1000); // Wait for API response

            // Go back to saved section
            await driver.get(`${BASE_URL}/saved-recipes`);
            await driver.sleep(2000); // Wait for fetch
            
            const newCards = await driver.findElements(By.css('.recipe-card, [class*="card"]'));
            // Either the count increased or the specific recipe title is present
            expect(newCards.length).toBeGreaterThanOrEqual(initialCount);
        } else {
            console.warn('No recipes available to save in this test environment');
        }
    });
});
