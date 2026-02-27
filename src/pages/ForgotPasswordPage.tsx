import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ForgotPasswordPage.css';

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
        <div className="fw-layout">
            <div className="fw-container-wrapper">
                <div className="fw-card">

                    {/* Left Hero Section */}
                    <div className="fw-hero">
                        <div className="hero-texture"></div>

                        <div className="fw-brand">
                            <div className="brand-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                                    <line x1="6" y1="17" x2="18" y2="17" />
                                </svg>
                            </div>
                            <span>Recipro</span>
                        </div>

                        <div className="hero-text">
                            <h2>Regain access<br />to your kitchen.</h2>
                            <p>Don't let a forgotten password disrupt your meal prep flow. Let's get you back in!</p>
                        </div>
                    </div>

                    {/* Right Form Section */}
                    <div className="fw-form-section">
                        {!isSubmitted ? (
                            <>
                                <div className="form-header">
                                    <h3>Forgot Password?</h3>
                                    <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
                                </div>

                                <form className="fw-form" onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <div className="input-container">
                                            <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                            <input
                                                type="email"
                                                className="form-input"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-btn" disabled={!email}>
                                        Send Reset Link
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="form-header">
                                    <h3>Check your inbox</h3>
                                    <p>We've sent password reset instructions to your email address.</p>
                                </div>
                                <div className="success-message">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                    Sent to {email}
                                </div>
                                <button type="button" className="submit-btn" onClick={() => navigate('/login')} style={{ width: '100%' }}>
                                    Return to Login
                                </button>
                            </>
                        )}

                        {!isSubmitted && (
                            <button type="button" className="back-to-login" onClick={() => navigate('/login')}>
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
