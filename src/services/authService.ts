const API_URL = 'http://localhost:8000/api/v1/auth';

export const registerService = async (data: { name: string; email: string; password: string }) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Registration failed');
    return result;
};

export const loginService = async (data: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Login failed');
    return result;
};

export const forgotPasswordService = async (data: { email: string }) => {
    const res = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to send OTP');
    return result;
};

// The backend expects the OTP sent along with the new password.
// This function acts as a local validator before traversing to the reset password page.
export const verifyOtp = async (data: { email: string; otp: string }) => {
    if (data.otp.length !== 6) throw new Error("OTP must be 6 digits.");
    return { success: true };
};

export const resetPasswordService = async (data: { email: string; otp: string; newPassword: string }) => {
    const res = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to reset password');
    return result;
};

// Resend OTP uses the same forgot-password logic on the backend
export const resendOtp = async (data: { email: string }) => {
    return forgotPasswordService(data);
};
