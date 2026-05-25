/**
 * Validates an email address on the frontend.
 * Checks for presence of '@' and '.' characters, as well as general format.
 * Returns an error message string if invalid, or null if valid.
 */
export const validateEmail = (email: string): string | null => {
    if (!email) {
        return 'Email is required';
    }
    if (!email.includes('@')) {
        return 'Email must include "@"';
    }
    if (!email.includes('.')) {
        return 'Email must include "."';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
};
