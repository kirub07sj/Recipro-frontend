import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration logic
        navigate("/home");
    };

    return (
        <div className="min-h-screen flex bg-[#080d0a] text-white font-sans relative overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] w-1/2 h-[60%] bg-[radial-gradient(circle,rgba(0,255,132,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full pointer-events-none z-0"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(0,255,132,0.03)_0%,rgba(0,0,0,0)_70%)] rounded-full pointer-events-none z-0"></div>
            <div className="flex justify-center items-center p-5 z-10 mx-auto w-full max-w-[1400px]">
                <div className="w-full max-w-[1000px] my-5 md:my-10 bg-[#0b110d] border border-white/5 rounded-[32px] flex flex-col md:flex-row overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] md:min-h-[600px]">

                    {/* Left Hero Section */}
                    <div className="flex-1 bg-[#111a14] px-12 py-[60px] flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-white/2 overflow-hidden">
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
                            <h2 className="text-[40px] font-extrabold leading-[1.1] m-0 mb-5 bg-[linear-gradient(180deg,#ffffff_0%,#8b9a91_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">Join the<br />Culinary Revolution.</h2>
                            <p className="text-[#8b9a91] text-base leading-[1.6] m-0 max-w-[320px]">Create an account to stop wasting ingredients, start saving money, and eat healthier every single day.</p>
                        </div>

                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex items-center gap-3 p-4 bg-[rgba(0,255,132,0.03)] border border-[rgba(0,255,132,0.1)] rounded-2xl text-[#e2e8f0] text-sm font-medium">
                                <div className="w-8 h-8 bg-[rgba(0,255,132,0.1)] text-[#00ff84] rounded-lg flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                                AI-Powered Recipe Generation
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-[rgba(0,255,132,0.03)] border border-[rgba(0,255,132,0.1)] rounded-2xl text-[#e2e8f0] text-sm font-medium">
                                <div className="w-8 h-8 bg-[rgba(0,255,132,0.1)] text-[#00ff84] rounded-lg flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                </div>
                                Unlimited Personal Cookbook
                            </div>
                        </div>
                    </div>

                    {/* Right Form Section */}
                    <div className="flex-1 px-12 py-[60px] flex flex-col justify-center max-w-full md:max-w-[480px]">
                        <div className="mb-10">
                            <h3 className="text-[28px] font-bold m-0 mb-2 text-white">Create an account</h3>
                            <p className="text-[#8b9a91] text-[15px] m-0">Let's get started with your 14-day free trial.</p>
                        </div>

                        <form className="flex flex-col gap-4" onSubmit={onFinish}>
                            <div className="flex gap-4">
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="text-[13px] font-semibold text-[#e2e8f0] ml-1">First Name</label>
                                    <div className="relative flex items-center">
                                        <svg className="absolute left-4 text-[#4a5c53] pointer-events-none transition-colors duration-200 [.group-focus-within_&]:text-[#00ff84] [&:not(:placeholder-shown)]:text-[#00ff84]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        <input
                                            type="text"
                                            className="peer group w-full p-4 pl-12 bg-[#080d0a] border border-white/10 rounded-2xl text-white text-[15px] transition-all duration-200 box-border placeholder:text-[#4a5c53] focus:outline-none focus:border-[#00ff84] focus:bg-[rgba(0,255,132,0.02)]"
                                            placeholder="John"
                                            required
                                        />
                                        <style>{`.peer:focus ~ svg, .peer:not(:placeholder-shown) ~ svg { color: #00ff84; }`}</style>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="text-[13px] font-semibold text-[#e2e8f0] ml-1">Last Name</label>
                                    <div className="relative flex items-center">
                                        <svg className="absolute left-4 text-[#4a5c53] pointer-events-none transition-colors duration-200 [.group-focus-within_&]:text-[#00ff84] [&:not(:placeholder-shown)]:text-[#00ff84]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        <input
                                            type="text"
                                            className="peer group w-full p-4 pl-12 bg-[#080d0a] border border-white/10 rounded-2xl text-white text-[15px] transition-all duration-200 box-border placeholder:text-[#4a5c53] focus:outline-none focus:border-[#00ff84] focus:bg-[rgba(0,255,132,0.02)]"
                                            placeholder="Doe"
                                            required
                                        />
                                        <style>{`.peer:focus ~ svg, .peer:not(:placeholder-shown) ~ svg { color: #00ff84; }`}</style>
                                    </div>
                                </div>
                            </div>

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
                                        required
                                    />
                                    <style>{`.peer:focus ~ svg, .peer:not(:placeholder-shown) ~ svg { color: #00ff84; }`}</style>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-semibold text-[#e2e8f0] ml-1">Password</label>
                                <div className="relative flex items-center">
                                    <svg className="absolute left-4 text-[#4a5c53] pointer-events-none transition-colors duration-200" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="peer w-full p-4 pl-12 bg-[#080d0a] border border-white/10 rounded-2xl text-white text-[15px] transition-all duration-200 box-border placeholder:text-[#4a5c53] focus:outline-none focus:border-[#00ff84] focus:bg-[rgba(0,255,132,0.02)]"
                                        placeholder="Create a password"
                                        required
                                        minLength={8}
                                    />
                                    <style>{`.peer:focus ~ svg, .peer:not(:placeholder-shown) ~ svg { color: #00ff84; }`}</style>
                                    <button
                                        type="button"
                                        className="absolute right-4 bg-transparent border-none text-[#4a5c53] cursor-pointer p-1 transition-colors duration-200 flex items-center justify-center hover:text-[#8b9a91]"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="my-2">
                                <label className="flex items-start gap-2 text-[13px] text-[#8b9a91] leading-[1.4]">
                                    <input type="checkbox" className="mt-0.5 accent-[#00ff84] cursor-pointer" required />
                                    <span>I agree to the <a href="#" className="text-[#00ff84] no-underline hover:underline">Terms of Service</a> and <a href="#" className="text-[#00ff84] no-underline hover:underline">Privacy Policy</a></span>
                                </label>
                            </div>

                            <button type="submit" className="bg-[#00ff84] text-[#05160b] border-none rounded-2xl p-[18px] font-bold text-base cursor-pointer flex items-center justify-center gap-3 transition-all duration-200 mt-2 hover:bg-[#33ff9d] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_-5px_rgba(0,255,132,0.3)] active:translate-y-0">
                                Create Account
                            </button>
                        </form>

                        <div className="flex items-center my-6 text-[#4a5c53] text-xs font-semibold uppercase tracking-[0.1em] before:content-[''] before:flex-1 before:h-px before:bg-white/5 before:mr-4 after:content-[''] after:flex-1 after:h-px after:bg-white/5 after:ml-4">Or sign up with</div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 flex items-center justify-center gap-[10px] p-[14px] bg-transparent border border-white/10 rounded-[14px] text-[#e2e8f0] font-semibold text-sm cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/20" type="button">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                                Google
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-[10px] p-[14px] bg-transparent border border-white/10 rounded-[14px] text-[#e2e8f0] font-semibold text-sm cursor-pointer transition-all duration-200 hover:bg-white/5 hover:border-white/20" type="button">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.93 1.932-1.31 2.926-1.31.12 0 .23.01.28.02.01.03.09.04.09.04zm-11.81 9.06c.01 3.01 2.8 4.6 2.8 4.6l-.18 1.44c-1.31.09-2.27.43-2.73.66-.46-.35-1.28-1.02-1.92-2.43-.89-1.97-.87-4.1-.11-5.7.54-1.13 1.4-2.05 2.53-2.61.02-.01.03-.02.04-.02zM8.32 1.6c.71-.48 1.57-.75 2.52-.75 1.35 0 2.56.55 3.44 1.43.91.9 1.47 2.14 1.47 3.52 0 1.26-.53 2.4-1.38 3.23-.84.82-1.97 1.34-3.23 1.34-1.15 0-2.2-.42-3.01-1.13-.81-.72-1.33-1.74-1.33-2.88 0-1.15.42-2.2 1.13-3.01.62-.64 1.42-1.15 2.39-1.75zm12.67 7.07c.01 3.01-2.8 4.6-2.8 4.6l.18 1.44c1.31.09 2.27.43 2.73.66.46-.35 1.28-1.02 1.92-2.43.89-1.97.87-4.1.11-5.7-.54-1.13-1.4-2.05-2.53-2.61-.02-.01-.03-.02-.04-.02zm-5.76 3.65c.57.8 1.47 1.53 2.38 2.34.86.76 1.7 1.6 2.13 2.65.65 1.58.55 3.44-.27 5.09-.76 1.54-2.06 2.72-3.66 3.32-1.45.54-3.13.56-4.66.02-1.41-.5-2.6-1.54-3.32-2.92-.76-1.47-.9-3.21-.36-4.76.49-1.41 1.51-2.56 2.84-3.24.9-.46 1.9-.71 2.92-.71 1.05 0 2.08.3 2.97.86.8.51 1.49 1.18 2.05 1.96.42.59 1.01 1.46 1.12 1.83.13.43-.09.91-.53 1.04-.43.13-.91-.09-1.04-.53-.08-.26-.55-.99-.87-1.45-.45-.63-1.01-1.17-1.65-1.58-.71-.45-1.53-.69-2.38-.69-.82 0-1.62.2-2.34.57-1.06.54-1.87 1.46-2.27 2.59-.43 1.24-.32 2.63.29 3.8.57 1.1 1.52 1.93 2.65 2.33 1.22.43 2.56.41 3.73-.01 1.28-.48 2.32-1.42 2.93-2.65.65-1.32.73-2.81.21-4.08-.34-.84-1.02-1.51-1.71-2.12-.73-.65-1.45-1.24-1.91-1.88-1.17-1.65-.67-3.95.84-5.18.35-.29.74-.52 1.14-.68z" />
                                </svg>
                                Apple
                            </button>
                        </div>

                        <div className="text-center mt-8 text-sm text-[#8b9a91]">
                            Already have an account?
                            <button type="button" className="bg-transparent border-none text-[#00ff84] font-semibold ml-1.5 cursor-pointer p-0 hover:underline" onClick={() => navigate("/login")}>Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;