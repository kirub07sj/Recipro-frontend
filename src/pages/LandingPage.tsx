import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    // Scroll to top on load just in case
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    <button onClick={() => navigate("/login")} className="nav-link">
                        Log in
                    </button>
                    <button onClick={() => navigate("/register")} className="btn-primary">
                        Sign up
                    </button>
                </div>
            </nav>

            <main className="landing-main">
                {/* HERO SECTION */}
                <section className="scroll-section hero-section">
                    <div className="hero-content">
                        <div className="badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#00ff84" stroke="#00ff84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            Next-Gen AI Cooking Assistant
                        </div>

                        <h1 className="hero-title">
                            Turn Your<br />
                            Ingredients Into<br />
                            <span className="text-neon">Healthy Recipes</span><br />
                            with AI
                        </h1>

                        <p className="hero-description">
                            Upload ingredients or type what you have, and get personalized
                            recipes based on your health conditions and preferences.
                        </p>

                        <div className="hero-actions">
                            <button onClick={() => navigate("/register")} className="btn-primary hero-btn">
                                Get Started Free
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </button>
                            <button onClick={() => navigate("/home")} className="btn-secondary hero-btn">
                                Watch Demo
                            </button>
                        </div>

                        <div className="social-proof">
                            <div className="avatar-group">
                                <div className="avatar" style={{backgroundColor: '#FF6B6B'}}>👩</div>
                                <div className="avatar" style={{backgroundColor: '#4EABF8'}}>👨</div>
                                <div className="avatar" style={{backgroundColor: '#FFB84C'}}>👩‍🦱</div>
                                <div className="avatar" style={{backgroundColor: '#9D65C9'}}>👨‍🦲</div>
                            </div>
                            <span>Joined by <strong>10k+</strong> home chefs</span>
                        </div>
                    </div>

                    <div className="hero-mockup">
                        <div className="mockup-header">
                            <div>
                                <h3>Hi, Alex.</h3>
                                <p>What are we cooking today?</p>
                            </div>
                            <div className="mockup-avatar-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                        </div>
                        
                        <div className="mockup-input">
                            <label>Enter Ingredients:</label>
                            <div className="input-with-icon">
                                <span>e.g. 2 eggs, avocado, sourdough bread...</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                            </div>
                            <button className="btn-primary w-full mock-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                Generate Recipes
                            </button>
                        </div>

                        <div className="mockup-tabs">
                            <div className="mockup-tab">
                                <span className="tab-icon">🍲</span>
                                <div>Save Recipe</div>
                            </div>
                            <div className="mockup-tab">
                                <span className="tab-icon">❤️</span>
                                <div>Health Profile</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="scroll-section features-section">
                    <div className="section-header text-center">
                        <h2>Master Your Kitchen with AI</h2>
                        <p>Our platform combines cutting-edge AI with nutrition science to help you eat better, waste less, and enjoy every meal.</p>
                    </div>

                    <div className="features-grid-3">
                        <div className="feature-card-dark">
                            <div className="feature-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                            </div>
                            <h3>AI Ingredient Detection</h3>
                            <p>Snap a photo of your fridge or pantry. Our AI identifies every ingredient instantly with computer vision.</p>
                        </div>
                        <div className="feature-card-dark">
                            <div className="feature-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                            </div>
                            <h3>Health-Based Suggestions</h3>
                            <p>Get recipes tailored to your health goals, whether it's low-carb, diabetic-friendly, or strictly gluten-free.</p>
                        </div>
                        <div className="feature-card-dark">
                            <div className="feature-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <h3>Smart Personalization</h3>
                            <p>The more you cook, the better we get. Our engine learns your taste preferences and dietary restrictions.</p>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section className="scroll-section steps-section">
                    <div className="steps-header">
                        <div className="steps-title-box">
                            <h2>Simple Steps to<br/>Delicious Healthy Meals</h2>
                            <p>We've streamlined the entire cooking process from discovery to plating.</p>
                        </div>
                        <button className="btn-outline">
                            See the Full Guide
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                    </div>

                    <div className="steps-row">
                        <div className="step-item">
                            <div className="step-number">01</div>
                            <h3>Upload or Enter</h3>
                            <p>List what you have or upload a photo of your ingredients.</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-item">
                            <div className="step-number">02</div>
                            <h3>AI Analysis</h3>
                            <p>Our AI filters through thousands of recipes based on your profile.</p>
                        </div>
                        <div className="step-connector"></div>
                        <div className="step-item">
                            <div className="step-number">03</div>
                            <h3>Cook & Enjoy</h3>
                            <p>Get step-by-step instructions for a personalized healthy meal.</p>
                        </div>
                    </div>
                </section>

                {/* CTA BOX SECTION */}
                <section className="scroll-section cta-section">
                    <div className="cta-box">
                        <h2>Ready to Cook Smarter?</h2>
                        <p>Join thousands of people who are using Recipro to transform their diet and live a healthier lifestyle through better cooking.</p>
                        <div className="cta-actions">
                            <button onClick={() => navigate("/register")} className="btn-dark">
                                Start Cooking Now
                            </button>
                            <button onClick={() => navigate("/register")} className="btn-white">
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </section>

                {/* FOOTER SECTION */}
                <footer className="landing-footer">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <div className="logo-container">
                                <div className="logo-icon" style={{background: '#00ff84'}}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                                        <line x1="6" y1="17" x2="18" y2="17" />
                                    </svg>
                                </div>
                                <span style={{color: '#fff', fontSize: '1.25rem', fontWeight: 'bold'}}>Recipro</span>
                            </div>
                            <p>
                                Empowering your kitchen with the intelligence of tomorrow. Healthy eating, simplified by AI.
                            </p>
                            <div className="social-links">
                                <a href="#" aria-label="Twitter">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                                </a>
                                <a href="#" aria-label="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <div className="link-group">
                                <h4>Product</h4>
                                <a href="#">Features</a>
                                <a href="#">AI Engine</a>
                                <a href="#">Recipe Database</a>
                                <a href="#">Mobile App</a>
                            </div>
                            <div className="link-group">
                                <h4>Support</h4>
                                <a href="#">Help Center</a>
                                <a href="#">Terms of Service</a>
                                <a href="#">Privacy Policy</a>
                                <a href="#">Cookie Settings</a>
                            </div>
                            <div className="link-group newsletter">
                                <h4>Newsletter</h4>
                                <p>Get weekly healthy recipes and kitchen tips.</p>
                                <div className="newsletter-input">
                                    <input type="email" placeholder="Enter your email" />
                                    <button>Join</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2026 Recipro. All rights reserved.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage;
