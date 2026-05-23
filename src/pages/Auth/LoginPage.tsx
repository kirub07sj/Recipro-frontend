import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService, googleLoginService } from '../../services/authService';
import { useGoogleLogin } from '@react-oauth/google';
import { getFriendlyErrorMessage } from '../../utils/errorHelper';

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
            setError(getFriendlyErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (tokenResponse: any) => {
        setLoading(true);
        setError('');
        try {
            if (!tokenResponse.access_token) throw new Error('No access token received');
            const response = await googleLoginService({ accessToken: tokenResponse.access_token });
            localStorage.setItem('token', response.token);
            if (response.user && response.user.username) {
                localStorage.setItem('userName', response.user.username);
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(getFriendlyErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => setError(getFriendlyErrorMessage('Google Sign In failed')),
    });

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

                    <div className="flex justify-center mb-4 w-full">
                        <button type="button" onClick={() => loginWithGoogle()} className="w-full py-4 bg-[#0d2d18] border border-[#143d22] hover:bg-[#143d22] rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chromium text-green-500" aria-hidden="true">
                                <path d="M10.88 21.94 15.46 14"></path>
                                <path d="M21.17 8H12"></path>
                                <path d="M3.95 6.06 8.54 14"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="4"></circle>
                            </svg>
                            <span className="text-sm font-medium">Continue with Google</span>
                        </button>
                    </div>

                    <div className="relative flex items-center mb-8">
                        <div className="flex-grow border-t border-[#143d22]"></div>
                        <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-[#8ba494]">or continue with email</span>
                        <div className="flex-grow border-t border-[#143d22]"></div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            <span className="font-medium text-left leading-relaxed">{error}</span>
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
