import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../../services/authService';
import { getFriendlyErrorMessage } from '../../utils/errorHelper';

const OtpPage = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    // In a real flow, email is passed via router state from the Forgot Password page
    const email = location.state?.email || 'user@example.com';

    // Handle timer
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        // Allow only the last entered digit if multiple are somehow typed
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Clear error when user starts typing again
        if (error) setError('');

        // Focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move focus to previous box if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
        if (!pastedData) return;

        const newOtp = [...otp];
        let lastFilledIndex = 0;
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
            lastFilledIndex = i;
        }
        setOtp(newOtp);

        // Clear error
        if (error) setError('');

        // Focus next empty or last input
        if (lastFilledIndex < 5) {
            inputRefs.current[lastFilledIndex + 1]?.focus();
        } else {
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) return;

        setLoading(true);
        setError('');

        try {
            await verifyOtp({ email, otp: otpCode });
            navigate('/reset-password', { state: { email, otp: otpCode } });
        } catch (err: any) {
            setError(getFriendlyErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        try {
            await resendOtp({ email });
            setTimer(60); // Reset timer after successful resend
        } catch (err: any) {
            setError(getFriendlyErrorMessage(err));
        }
    };

    const formatTime = (time: number) => {
        return time < 10 ? `00:0${time}` : `00:${time}`;
    };

    const isComplete = otp.every((val) => val !== '');

    return (
        <div className="min-h-screen w-full bg-[#031c16] text-white flex flex-col items-center justify-start px-6 pt-12 font-sans overflow-hidden relative">
            {/* Background Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-[#1fff66]/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-[#1fff66]/5 blur-[100px] rounded-full"></div>

            {/* Header */}
            <div className="w-full max-w-md flex items-center justify-center mb-12 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors hidden max-md:flex"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-6 h-6 text-white/60">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                <div className="bg-[#1fff66]/20 p-2.5 rounded-2xl border border-[#1fff66]/30 ml-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check w-6 h-6 text-[#1fff66]">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                    </svg>
                </div>
                <div className="w-10"></div>
            </div>

            <main className="w-full max-w-md flex flex-col items-center text-center relative z-10 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Verify Your Code
                </h1>
                <p className="text-white/60 text-base mb-8 leading-relaxed">
                    Enter the 6-digit code sent to<br />
                    <span className="text-[#1fff66] font-medium">{email}</span>
                </p>

                <div className="flex gap-2 sm:gap-3 mb-6">
                    {otp.map((data, index) => (
                        <div key={index}>
                            <input
                                ref={(el) => { inputRefs.current[index] = el; }}
                                inputMode="numeric"
                                maxLength={1}
                                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-2xl border-2 transition-all outline-none 
                                    ${data
                                        ? 'border-[#1fff66] bg-[#1fff66]/10 shadow-[0_0_20px_rgba(31,255,102,0.2)]'
                                        : 'border-white/10 bg-white/5 focus:border-[#1fff66]/50 focus:bg-[#1fff66]/5'
                                    } ${error ? 'border-red-500 bg-red-500/10' : ''}`}
                                type="text"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                autoFocus={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="w-full mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span className="font-medium text-left leading-relaxed">{error}</span>
                    </div>
                )}

                {/* Timer / Resend */}
                <div className="mb-10 w-full flex justify-center h-6 items-center">
                    {timer > 0 ? (
                        <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                            <span>Resend code in</span>
                            <span className="text-[#1fff66] font-mono">{formatTime(timer)}</span>
                        </div>
                    ) : (
                        <p
                            onClick={handleResend}
                            className="text-[#1fff66] text-sm font-bold hover:underline transition-all cursor-pointer"
                        >
                            Resend Code
                        </p>
                    )}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={!isComplete || loading}
                    className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all 
                        ${isComplete && !loading
                            ? 'bg-[#1fff66] text-[#031c16] hover:bg-[#1ce65c] active:scale-[0.98] shadow-[0_0_30px_rgba(31,255,102,0.3)]'
                            : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                >
                    {loading ? (
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <>
                            Verify & Continue
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </>
                    )}
                </button>
            </main>

            <div className="mt-auto mb-10 text-white/30 text-xs tracking-wider uppercase font-medium relative z-10">
                Secure Verification Protocol v2.4
            </div>
        </div>
    )
}

export default OtpPage;