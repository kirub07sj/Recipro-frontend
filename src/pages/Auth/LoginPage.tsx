import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/authService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onFinish = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!email || !password) {
                throw new Error('Please fill all fields');
            }
            const response = await loginService({ email, password });
            localStorage.setItem('token', response.token);
            if (response.user && response.user.username) {
                localStorage.setItem('userName', response.user.username);
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
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

                    <div className="flex flex-col items-center mb-2">
                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chef-hat text-[#05160b] w-8 h-8" aria-hidden="true">
                                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
                                <path d="M6 17h12"></path>
                            </svg>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                            <p className="text-[#8ba494] text-sm mt-1">Ready to cook something delicious?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0d2d18] border border-[#143d22] hover:bg-[#143d22] transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chromium text-green-500" aria-hidden="true">
                                <path d="M10.88 21.94 15.46 14"></path>
                                <path d="M21.17 8H12"></path>
                                <path d="M3.95 6.06 8.54 14"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="4"></circle>
                            </svg>
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0d2d18] border border-[#143d22] hover:bg-[#143d22] transition-colors duration-200">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white">
                                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.93 1.932-1.31 2.926-1.31.12 0 .23.01.28.02.01.03.09.04.09.04zm-11.81 9.06c.01 3.01 2.8 4.6 2.8 4.6l-.18 1.44c-1.31.09-2.27.43-2.73.66-.46-.35-1.28-1.02-1.92-2.43-.89-1.97-.87-4.1-.11-5.7.54-1.13 1.4-2.05 2.53-2.61.02-.01.03-.02.04-.02zM8.32 1.6c.71-.48 1.57-.75 2.52-.75 1.35 0 2.56.55 3.44 1.43.91.9 1.47 2.14 1.47 3.52 0 1.26-.53 2.4-1.38 3.23-.84.82-1.97 1.34-3.23 1.34-1.15 0-2.2-.42-3.01-1.13-.81-.72-1.33-1.74-1.33-2.88 0-1.15.42-2.2 1.13-3.01.62-.64 1.42-1.15 2.39-1.75zm12.67 7.07c.01 3.01-2.8 4.6-2.8 4.6l.18 1.44c1.31.09 2.27.43 2.73.66.46-.35 1.28-1.02 1.92-2.43.89-1.97.87-4.1.11-5.7-.54-1.13-1.4-2.05-2.53-2.61-.02-.01-.03-.02-.04-.02zm-5.76 3.65c.57.8 1.47 1.53 2.38 2.34.86.76 1.7 1.6 2.13 2.65.65 1.58.55 3.44-.27 5.09-.76 1.54-2.06 2.72-3.66 3.32-1.45.54-3.13.56-4.66.02-1.41-.5-2.6-1.54-3.32-2.92-.76-1.47-.9-3.21-.36-4.76.49-1.41 1.51-2.56 2.84-3.24.9-.46 1.9-.71 2.92-.71 1.05 0 2.08.3 2.97.86.8.51 1.49 1.18 2.05 1.96.42.59 1.01 1.46 1.12 1.83.13.43-.09.91-.53 1.04-.43.13-.91-.09-1.04-.53-.08-.26-.55-.99-.87-1.45-.45-.63-1.01-1.17-1.65-1.58-.71-.45-1.53-.69-2.38-.69-.82 0-1.62.2-2.34.57-1.06.54-1.87 1.46-2.27 2.59-.43 1.24-.32 2.63.29 3.8.57 1.1 1.52 1.93 2.65 2.33 1.22.43 2.56.41 3.73-.01 1.28-.48 2.32-1.42 2.93-2.65.65-1.32.73-2.81.21-4.08-.34-.84-1.02-1.51-1.71-2.12-.73-.65-1.45-1.24-1.91-1.88-1.17-1.65-.67-3.95.84-5.18.35-.29.74-.52 1.14-.68z" />
                            </svg>
                            <span className="text-sm font-medium">Apple</span>
                        </button>
                    </div>

                    <div className="relative flex items-center mb-8">
                        <div className="flex-grow border-t border-[#143d22]"></div>
                        <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-[#8ba494]">or continue with email</span>
                        <div className="flex-grow border-t border-[#143d22]"></div>
                    </div>

                    {error && (
                        <div className="mb-4 text-red-500 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={onFinish}>
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

                        <div className="relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#8ba494] group-focus-within:text-green-500 transition-colors" aria-hidden="true">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <input
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-12 py-3.5 bg-[#0d2d18] border border-[#143d22] rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all placeholder:text-[#8ba494]/50"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8ba494] hover:text-white transition-colors bg-transparent border-0 outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs text-green-500 hover:text-green-400 font-medium transition-colors bg-transparent border-none">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-green-500 hover:bg-green-400 text-[#05160b] rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]  border-none ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    Sign In
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-4 text-center flex items-center justify-center gap-2">
                        <p className="text-sm text-[#8ba494]">
                            Don't have an account?
                        </p>
                        <p onClick={() => navigate('/register')} className="text-green-500 font-bold hover:text-green-400 transition-colors bg-transparent border-0 outline-none cursor-pointer">Join now</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between p-4 bg-[#0d2d18]/50 rounded-2xl border border-[#143d22]/50 cursor-pointer hover:bg-[#143d22]/50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chef-hat text-green-500" aria-hidden="true"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path><path d="M6 17h12"></path></svg>
                            </div>
                            <div className="text-left">
                                <div className="text-xs font-semibold text-white">Smart Recipe Generator AI</div>
                                <div className="text-[10px] text-[#8ba494]">Cook based on your fridge</div>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right text-[#8ba494] group-hover:text-white transition-colors" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
                    </div>
                </div>

                <div className="fixed bottom-6 text-[10px] uppercase tracking-[0.2em] text-[#8ba494]/30 pointer-events-none">
                    Culinary Intelligence System v1.0.4
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
