import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock sending password reset email
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex bg-[#080d0a] text-white font-sans relative overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-1/2 h-[60%] bg-[radial-gradient(circle,rgba(0,255,132,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full pointer-events-none z-0"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(0,255,132,0.03)_0%,rgba(0,0,0,0)_70%)] rounded-full pointer-events-none z-0"></div>
            <div className="w-full flex justify-center items-center py-10 px-5 relative z-10">
                <div className="w-full max-w-[1000px] bg-[#0b110d] border border-white/5 rounded-[32px] flex flex-col md:flex-row overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] md:min-h-[600px]">

                    {/* Left Hero Section */}
                    <div className="flex-1 bg-[#111a14] px-12 py-[60px] flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-white/2">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00ff84_1px,transparent_1px)] bg-[length:24px_24px] opacity-5 z-0"></div>

                        <div className="relative z-10 flex items-center gap-3 text-2xl font-extrabold text-white">
                            <div className="w-10 h-10 bg-[#00ff84] rounded-xl flex items-center justify-center text-[#05160b] shadow-[0_0_20px_rgba(0,255,132,0.2)]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                                    <line x1="6" y1="17" x2="18" y2="17" />
                                </svg>
                            </div>
                            <span>Recipro</span>
                        </div>

                        <div className="relative z-10 mt-[60px] mb-10">
                            <h2 className="text-[40px] font-extrabold leading-[1.1] m-0 mb-5 bg-[linear-gradient(180deg,#ffffff_0%,#8b9a91_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">Regain access<br />to your kitchen.</h2>
                            <p className="text-[#8b9a91] text-base leading-[1.6] m-0 max-w-[320px]">Don't let a forgotten password disrupt your meal prep flow. Let's get you back in!</p>
                        </div>
                    </div>

                    {/* Right Form Section */}
                    <div className="flex-1 px-12 py-[60px] flex flex-col justify-center max-w-full md:max-w-[480px]">
                        {!isSubmitted ? (
                            <>
                                <div className="mb-10">
                                    <h3 className="text-[28px] font-bold m-0 mb-2 text-white">Forgot Password?</h3>
                                    <p className="text-[#8b9a91] text-[15px] m-0 leading-[1.5]">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                                </div>

                                <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-semibold text-[#e2e8f0] ml-1">Email address</label>
                                        <div className="relative flex items-center">
                                            <svg className="absolute left-4 text-[#4a5c53] pointer-events-none transition-colors duration-200 [.group-focus-within_&]:text-[#00ff84] [&:not(:placeholder-shown)]:text-[#00ff84]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                            <input
                                                type="email"
                                                className="peer group w-full p-4 pl-12 bg-[#080d0a] border border-white/10 rounded-2xl text-white text-[15px] transition-all duration-200 box-border placeholder:text-[#4a5c53] focus:outline-none focus:border-[#00ff84] focus:bg-[rgba(0,255,132,0.02)]"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <style>{`.peer:focus ~ svg, .peer:not(:placeholder-shown) ~ svg { color: #00ff84; }`}</style>
                                        </div>
                                    </div>

                                    <button type="submit" className="bg-[#00ff84] text-[#05160b] border-none rounded-2xl p-[18px] font-bold text-base cursor-pointer flex items-center justify-center gap-3 transition-all duration-200 mt-2 hover:bg-[#33ff9d] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-5px_rgba(0,255,132,0.3)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00ff84] disabled:hover:translate-y-0 disabled:hover:shadow-none" disabled={!email}>
                                        Send Reset Link
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="mb-10">
                                    <h3 className="text-[28px] font-bold m-0 mb-2 text-white">Check your inbox</h3>
                                    <p className="text-[#8b9a91] text-[15px] m-0 leading-[1.5]">We've sent password reset instructions to your email address.</p>
                                </div>
                                <div className="p-4 bg-[rgba(0,255,132,0.1)] border border-[rgba(0,255,132,0.3)] rounded-xl text-[#00ff84] text-sm font-medium leading-[1.5] mb-6 flex items-center gap-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    Sent to {email}
                                </div>
                                <button type="button" className="bg-[#00ff84] text-[#05160b] border-none rounded-2xl p-[18px] font-bold text-base cursor-pointer flex items-center justify-center gap-3 transition-all duration-200 mt-2 hover:bg-[#33ff9d] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-5px_rgba(0,255,132,0.3)] active:translate-y-0 w-full" onClick={() => navigate('/login')}>
                                    Return to Login
                                </button>
                            </>
                        )}

                        {!isSubmitted && (
                            <button type="button" className="flex items-center justify-center gap-2 mt-8 text-[#8b9a91] text-sm font-medium no-underline transition-colors duration-200 bg-transparent border-none cursor-pointer hover:text-[#00ff84]" onClick={() => navigate('/login')}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                Back to login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
