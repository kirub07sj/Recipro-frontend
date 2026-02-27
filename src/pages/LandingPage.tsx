import React from 'react';
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-layout">
            <nav className="landing-nav">
                <div className="logo-container">
                    <div className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                            <line x1="6" y1="17" x2="18" y2="17" />
                        </svg>
                    </div>
                    <span>Recipro</span>
                </div>

                <div className="nav-actions">
                    <button onClick={() => navigate("/login")} className="nav-link" style={{ background: 'transparent', border: 'none' }}>
                        Log in
                    </button>
                    <button onClick={() => navigate("/register")} className="btn-primary">
                        Sign up
                    </button>
                </div>
            </nav>

            <section className="hero-section">
                <div className="hero-content">
                    <div className="badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        Personalized AI Recipe Generator
                    </div>

                    <h1 className="hero-title">
                        Healthy meals,<br />
                        tailored for <span>you.</span>
                    </h1>

                    <p className="hero-description">
                        Discover and generate delicious recipes that perfectly match your dietary needs, preferences, and whatever ingredients you have in your fridge right now.
                    </p>

                    <div className="hero-actions">
                        <button onClick={() => navigate("/register")} className="btn-primary hero-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            Get Started Free
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                        <button onClick={() => navigate("/home")} className="btn-secondary hero-btn">
                            View Demo
                        </button>
                    </div>
                </div>

                <div className="hero-image-container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                            </div>
                            <h3>Snap & Cook</h3>
                            <p>Take a photo of your fridge and let our AI generate the perfect meal with what you have.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <h3>Track Macros</h3>
                            <p>Every recipe comes with detailed nutritional information to hit your targets.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;