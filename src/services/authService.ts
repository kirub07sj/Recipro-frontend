export const verifyOtp = async (data: { email: string; otp: string }) => {
    // console.log("verifyOtp called with", data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.otp === "123456") resolve({ success: true });
            else reject(new Error("Invalid OTP code. Please try again."));
        }, 1000);
    });
};

export const resendOtp = async (data: { email: string }) => {
    // console.log("resendOtp called with", data);
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};
