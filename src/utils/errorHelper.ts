/**
 * Parses raw error objects from api calls/fetch, javascript exceptions,
 * and formats them into a clean, human-friendly string.
 */
export const getFriendlyErrorMessage = (error: any): string => {
    if (!error) {
        return 'An unexpected error occurred. Please try again.';
    }

    // Handle string error directly
    if (typeof error === 'string') {
        return cleanErrorMessage(error);
    }

    const message = error.message || '';

    // Check for network connectivity or server offline issues
    if (
        message.includes('Failed to fetch') ||
        message.includes('NetworkError') ||
        message.includes('network error') ||
        message.includes('Load failed') ||
        (error.name === 'TypeError' && message.toLowerCase().includes('fetch'))
    ) {
        return 'Connection issues. Please check your internet connection and try again.';
    }

    // Check for JSON parser crash on bad html gateways
    if (message.includes('Unexpected token') || message.includes('is not valid JSON')) {
        return 'Our servers are taking a quick break. We are looking into this, please try again shortly.';
    }

    // Clean up specific raw backend string patterns
    if (message) {
        return cleanErrorMessage(message);
    }

    return 'Something went wrong. Please try again in a few moments.';
};

const cleanErrorMessage = (msg: string): string => {
    const lower = msg.toLowerCase();

    if (
        lower.includes('user already exists') || 
        lower.includes('email already exists') || 
        lower.includes('already registered') ||
        lower.includes('e11000') ||
        lower.includes('duplicate key')
    ) {
        return 'The email already exists. Use a different email.';
    }
    if (
        lower.includes('incorrect password') || 
        lower.includes('invalid credentials') || 
        lower.includes('wrong password') || 
        lower.includes('not found') ||
        lower.includes('invalid email or password')
    ) {
        return 'Invalid email or password. Please double-check your details and try again.';
    }
    if (lower.includes('jwt') || lower.includes('unauthorized') || lower.includes('token expired') || lower.includes('invalid token')) {
        return 'Your session has expired. Please sign in again to continue.';
    }
    if (lower.includes('rate limit') || lower.includes('too many requests')) {
        return 'You are doing that too fast! Please wait a moment and try again.';
    }
    if (lower.includes('validation failed') || lower.includes('please fill all fields')) {
        return 'Please fill in all fields correctly before submitting.';
    }
    if (lower.includes('otp must be 6 digits') || lower.includes('invalid otp') || lower.includes('incorrect otp')) {
        return 'The verification code you entered is invalid. Please double check and try again.';
    }

    // Return message if it looks clean/custom, otherwise fallback
    if (msg.length < 100 && !msg.includes('stack') && !msg.includes('undefined') && !msg.includes('Object')) {
        return msg;
    }

    return 'An unexpected issue occurred. Please try again.';
};
