import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { forgotPasswordService } from '../../services/authService';
import { getFriendlyErrorMessage } from '../../utils/errorHelper';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                setError('Please enter a valid email address (e.g., user@example.com)');
                setLoading(false);
                return;
            }
            await forgotPasswordService({ email });
            setIsSubmitted(true);
            setTimeout(() => {
                navigate('/otp', { state: { email } });
            }, 1000);
        } catch (err: any) {
            setError(getFriendlyErrorMessage(err));
            setIsSubmitted(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="root">
            <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#05160b] text-white font-sans selection:bg-green-500/30">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/20 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-800/10 blur-[120px] rounded-full"></div>
                </div>
                <div className="relative w-full max-w-md bg-[#0a2313] rounded-[32px] border border-[#143d22] p-8 shadow-2xl overflow-hidden transition-all">

                    <div className="flex flex-col items-center mb-6">
                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            {isSubmitted ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#05160b] w-8 h-8" aria-hidden="true">
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key text-[#05160b] w-8 h-8" aria-hidden="true">
                                    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                                    <path d="m21 2-9.6 9.6" />
                                    <circle cx="7.5" cy="15.5" r="5.5" />
                                </svg>
                            )}
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight">
                                {isSubmitted ? "Check your inbox" : "Forgot Password?"}
                            </h1>
                            <p className="text-[#8ba494] text-sm mt-1 leading-[1.5]">
                                {isSubmitted
                                    ? "We've sent password reset instructions to your email address."
                                    : "Enter your email address and we'll send you a reset link."
                                }
                            </p>
                        </div>
                    </div>

                    {!isSubmitted ? (
                        <>
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    <span className="font-medium text-left leading-relaxed">{error}</span>
                                </div>
                            )}

                            <form className="space-y-4" onSubmit={onSubmit}>
                                <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-4 top-1/2 -translate-y-1/2 text-[#8ba494] group-focus-within:text-green-500 transition-colors" aria-hidden="true">
                                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                    </svg>
                                    <input
                                        placeholder="Email address"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-[#0d2d18] border border-[#143d22] rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all placeholder:text-[#8ba494]/50"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !email}
                                    className={`w-full py-4 bg-green-500 hover:bg-green-400 text-[#05160b] border-none rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] mt-2 ${loading || !email ? 'opacity-50 cursor-not-allowed hover:bg-green-500 shadow-none' : ''}`}
                                >
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center flex items-center justify-center gap-2">
                                <button type="button" onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 text-[#8ba494] text-sm font-medium hover:text-green-500 transition-colors bg-transparent border-0 outline-none cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                                    Back to login
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-6">
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-500 text-sm font-medium leading-[1.5] flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    Sent to {email}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="w-full py-4 bg-green-500 hover:bg-green-400 text-[#05160b] border-none rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
                                >
                                    Return to Login
                                </button>
                            </div>
                        </>
                    )}

                </div>

                <div className="fixed bottom-6 text-[10px] uppercase tracking-[0.2em] text-[#8ba494]/30 pointer-events-none">
                    Culinary Intelligence System v1.0.4
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
