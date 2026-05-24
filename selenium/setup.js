const { createDriver, quitDriver } = require('./driver');
const { execSync } = require('child_process');
const path = require('path');

beforeAll(async () => {
    try {
        console.log('Seeding database for test user...');
        execSync('node src/scripts/seedTestUser.js', {
            cwd: path.resolve(__dirname, '../../Recipro-backend'),
            stdio: 'inherit'
        });
        console.log('Database seeded successfully.');
    } catch (err) {
        console.warn('Warning: Could not seed test database automatically:', err.message);
    }

    // Initialize the browser once before all tests
    await createDriver();
});

afterAll(async () => {
    // Quit the browser once after all tests
    await quitDriver();
});
