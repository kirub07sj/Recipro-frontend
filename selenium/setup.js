const { createDriver, quitDriver } = require('./driver');

beforeAll(async () => {
    // Initialize the browser once before all tests
    await createDriver();
});

afterAll(async () => {
    // Quit the browser once after all tests
    await quitDriver();
});
