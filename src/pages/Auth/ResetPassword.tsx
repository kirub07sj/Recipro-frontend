import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPasswordService } from '../../services/authService';
import { getFriendlyErrorMessage } from '../../utils/errorHelper';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // In real flow, email and otp will be in location state
    const email = location.state?.email || '';
    const otp = location.state?.otp || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);



    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const getPasswordScore = () => {
        let score = 0;
        if (hasLength) score++;
        if (hasUpper) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;
        return score;
    };
    const passwordScore = getPasswordScore();

    useEffect(() => {
        if (!email || !otp) {
            navigate('/forgot-password');
        }
    }, [email, otp, navigate]);

    const onFinish = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!hasLength || !hasUpper || !hasNumber || !hasSpecial) {
            setError("Password is too weak. Make sure all requirements are checked.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await resetPasswordService({ email, otp, newPassword: password });
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Route back to login automatically after success
        } catch (err: any) {
            setError(getFriendlyErrorMessage(err));
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
                            {success ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#05160b] w-8 h-8" aria-hidden="true">
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-[#05160b] w-8 h-8" aria-hidden="true">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                            )}
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight">
                                {success ? "Password Reset!" : "Create new password"}
                            </h1>
                            <p className="text-[#8ba494] text-sm mt-1 leading-[1.5]">
                                {success
                                    ? "Your password has been changed successfully. Redirecting..."
                                    : "Your new password must be different from previous used passwords."
                                }
                            </p>
                        </div>
                    </div>

                    {!success && (
                        <>
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm animate-fade-in shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    <span className="font-medium text-left leading-relaxed">{error}</span>
                                </div>
                            )}

                            <form className="space-y-4" onSubmit={onFinish}>
                                <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#8ba494] group-focus-within:text-green-500 transition-colors" aria-hidden="true">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <input
                                        placeholder="New Password"
                                        required
                                        minLength={8}
                                        className="w-full pl-12 pr-12 py-3.5 bg-[#0d2d18] border border-[#143d22] rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500 transition-all placeholder:text-[#8ba494]/50"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8ba494] hover:text-white transition-colors bg-transparent border-0 outline-none"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        )}
                                    </button>

                                    {isPasswordFocused && password && (
                                        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 p-4 bg-[#0d2d18]/95 backdrop-blur-2xl border border-[#143d22]/80 rounded-2xl text-xs space-y-2.5 text-left shadow-2xl transition-all">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[#8ba494]">Password Strength:</span>
                                                <span className={`font-bold uppercase tracking-wider ${passwordScore === 4 ? 'text-green-400' :
                                                    passwordScore >= 2 ? 'text-yellow-400' :
                                                        'text-red-400'
                                                    }`}>
                                                    {passwordScore === 4 ? 'Strong' :
                                                        passwordScore >= 2 ? 'Medium' :
                                                            'Weak'}
                                                </span>
                                            </div>
                                            <div className="w-full bg-[#143d22] h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${passwordScore === 4 ? 'bg-green-500 w-full' :
                                                        passwordScore >= 2 ? 'bg-yellow-500 w-2/3' :
                                                            'bg-red-500 w-1/3'
                                                        }`}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-[#8ba494]">
                                                <div className="flex items-center gap-1.5">
                                                    <svg className={`w-3.5 h-3.5 ${hasLength ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        {hasLength ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        )}
                                                    </svg>
                                                    <span>8+ characters</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <svg className={`w-3.5 h-3.5 ${hasUpper ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        {hasUpper ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        )}
                                                    </svg>
                                                    <span>Uppercase letter</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <svg className={`w-3.5 h-3.5 ${hasNumber ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        {hasNumber ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        )}
                                                    </svg>
                                                    <span>At least one number</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <svg className={`w-3.5 h-3.5 ${hasSpecial ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                        {hasSpecial ? (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        ) : (
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        )}
                                                    </svg>
                                                    <span>Special character</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {password && (
                                    <div className=" absolute z-50 p-4 bg-[#0d2d18]/70 border backdrop-blur-2xl border-[#143d22]/50 rounded-2xl text-xs space-y-2.5 text-left transition-all">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#8ba494]">Password Strength:</span>
                                            <span className={`font-bold uppercase tracking-wider ${passwordScore === 4 ? 'text-green-400' :
                                                passwordScore >= 2 ? 'text-yellow-400' :
                                                    'text-red-400'
                                                }`}>
                                                {passwordScore === 4 ? 'Strong' :
                                                    passwordScore >= 2 ? 'Medium' :
                                                        'Weak'}
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#143d22] h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${passwordScore === 4 ? 'bg-green-500 w-full' :
                                                    passwordScore >= 2 ? 'bg-yellow-500 w-2/3' :
                                                        'bg-red-500 w-1/3'
                                                    }`}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-[#8ba494]">
                                            <div className="flex items-center gap-1.5">
                                                <svg className={`w-3.5 h-3.5 ${hasLength ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    {hasLength ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    )}
                                                </svg>
                                                <span>8+ characters</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <svg className={`w-3.5 h-3.5 ${hasUpper ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    {hasUpper ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    )}
                                                </svg>
                                                <span>Uppercase letter</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <svg className={`w-3.5 h-3.5 ${hasNumber ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    {hasNumber ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    )}
                                                </svg>
                                                <span>At least one number</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <svg className={`w-3.5 h-3.5 ${hasSpecial ? 'text-green-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    {hasSpecial ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    )}
                                                </svg>
                                                <span>Special character</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#8ba494] group-focus-within:text-green-500 transition-colors" aria-hidden="true">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <input
                                        placeholder="Confirm New Password"
                                        required
                                        minLength={8}
                                        className={`w-full pl-12 pr-12 py-3.5 bg-[#0d2d18] border ${password && confirmPassword && password !== confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/40' : 'border-[#143d22] focus:border-green-500 focus:ring-green-500/40'} rounded-2xl focus:outline-none focus:ring-2 transition-all placeholder:text-[#8ba494]/50`}
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8ba494] hover:text-white transition-colors bg-transparent border-0 outline-none"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye" aria-hidden="true"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                        )}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !password || !confirmPassword}
                                    className={`w-full py-4 bg-green-600 hover:bg-green-400 text-[#05160b] border-none rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] mt-6 ${loading || !password || !confirmPassword ? 'opacity-50 cursor-not-allowed hover:bg-green-600 shadow-none' : ''}`}
                                >
                                    {loading ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Reset Password"
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
                    )}

                </div>

                <div className="fixed bottom-6 text-[10px] uppercase tracking-[0.2em] text-[#8ba494]/30 pointer-events-none">
                    Culinary Intelligence System v1.0.4
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;