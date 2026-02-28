import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    // Scroll to top on load just in case
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0b110d] text-white font-sans flex flex-col">
            <nav className="flex justify-between items-center py-8 px-[10%] max-w-[1400px] mx-auto w-full box-border">
                <div className="flex items-center gap-3 text-xl font-bold">
                    <div className="flex items-center justify-center w-9 h-9 bg-[rgba(0,255,102,0.1)] text-[#00ff84] rounded-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                            <line x1="6" y1="17" x2="18" y2="17" />
                        </svg>
                    </div>
                    <span>Recipro</span>
                </div>

                <div className="flex gap-4 items-center">
                    <button onClick={() => navigate("/login")} className="text-[#8b9a91] bg-transparent border-none font-medium text-[15px] py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-200 hover:text-white hover:bg-[rgba(255,255,255,0.05)]">
                        Log in
                    </button>
                    <button onClick={() => navigate("/register")} className="bg-[#00ff84] text-[#080d0a] border-none py-3 px-6 rounded-xl font-bold text-[15px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:bg-[#33ff9d]">
                        Sign up
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col">
                {/* HERO SECTION */}
                <section className="py-20 px-[10%] relative max-w-[1400px] mx-auto w-full box-border flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-1 max-w-[600px] text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-[rgba(0,255,102,0.1)] text-[#00ff84] py-2 px-4 rounded-full text-[13px] font-semibold mb-6 border border-[rgba(0,255,102,0.2)]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#00ff84" stroke="#00ff84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            Next-Gen AI Cooking Assistant
                        </div>

                        <h1 className="text-[40px] md:text-[56px] font-extrabold leading-[1.1] m-0 mb-6 text-white">
                            Turn Your<br />
                            Ingredients Into<br />
                            <span className="text-[#00ff84]">Healthy Recipes</span><br />
                            with AI
                        </h1>

                        <p className="text-lg leading-[1.6] text-[#8b9a91] m-0 mb-10">
                            Upload ingredients or type what you have, and get personalized
                            recipes based on your health conditions and preferences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center md:justify-start">
                            <button onClick={() => navigate("/register")} className="bg-[#00ff84] text-[#080d0a] border-none py-4 px-8 rounded-xl font-bold text-base cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:bg-[#33ff9d]">
                                Get Started Free
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </button>
                            <button onClick={() => navigate("/home")} className="bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.1)] py-4 px-8 rounded-xl font-semibold text-base cursor-pointer transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(0,255,102,0.3)]">
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 text-[#8b9a91] text-sm md:justify-start mb-10 md:mb-0">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0b110d] text-sm text-[14px]" style={{ backgroundColor: '#FF6B6B' }}>👩</div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0b110d] text-sm -ml-2.5 text-[14px]" style={{ backgroundColor: '#4EABF8' }}>👨</div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0b110d] text-sm -ml-2.5 text-[14px]" style={{ backgroundColor: '#FFB84C' }}>👩‍🦱</div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0b110d] text-sm -ml-2.5 text-[14px]" style={{ backgroundColor: '#9D65C9' }}>👨‍🦲</div>
                            </div>
                            <span>Joined by <strong>10k+</strong> home chefs</span>
                        </div>
                    </div>

                    <div className="flex-1 bg-[linear-gradient(145deg,rgba(20,30,24,0.8),rgba(12,18,14,0.9))] border border-[rgba(255,255,255,0.05)] rounded-3xl p-8 max-w-[500px] shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_80px_rgba(0,255,102,0.05)] w-full">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="m-0 mb-1 font-bold text-xl">Hi, Alex.</h3>
                                <p className="m-0 text-[#8b9a91] text-sm">What are we cooking today?</p>
                            </div>
                            <div className="w-10 h-10 bg-[rgba(0,255,102,0.1)] text-[#00ff84] rounded-xl flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                        </div>

                        <div className="bg-[rgba(0,0,0,0.3)] rounded-2xl p-6 mb-6">
                            <label className="block mb-3 text-sm text-[#e0e0e0]">Enter Ingredients:</label>
                            <div className="flex justify-between items-center bg-[#0b110d] p-4 rounded-xl border border-[rgba(255,255,255,0.05)] mb-4 text-[#666] text-sm">
                                <span>e.g. 2 eggs, avocado, sourdough bread...</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                            </div>
                            <button className="bg-[#00ff84] text-[#080d0a] border-none p-4 rounded-xl font-bold text-[15px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:bg-[#33ff9d] w-full">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                Generate Recipes
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-5 text-center text-sm text-[#b0b0b0] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer">
                                <span className="block text-2xl mb-2">🍲</span>
                                <div>Save Recipe</div>
                            </div>
                            <div className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-5 text-center text-sm text-[#b0b0b0] transition-colors duration-200 hover:bg-[rgba(255,255,255,0.08)] cursor-pointer">
                                <span className="block text-2xl mb-2">❤️</span>
                                <div>Health Profile</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section className="py-20 px-[10%] relative max-w-[1400px] mx-auto w-full box-border pt-15">
                    <div className="text-center max-w-[600px] mx-auto mb-15">
                        <h2 className="text-4xl m-0 mb-4">Master Your Kitchen with AI</h2>
                        <p className="color-[#8b9a91] text-base leading-[1.6]">Our platform combines cutting-edge AI with nutrition science to help you eat better, waste less, and enjoy every meal.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-[linear-gradient(180deg,rgba(20,30,24,0.6)_0%,rgba(12,18,14,0.8)_100%)] border border-[rgba(255,255,255,0.03)] rounded-3xl py-10 px-8 transition-transform duration-300 hover:-translate-y-2 hover:border-[rgba(0,255,102,0.2)]">
                            <div className="w-12 h-12 bg-[rgba(0,255,102,0.1)] rounded-xl flex items-center justify-center mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                            </div>
                            <h3 className="text-xl m-0 mb-3">AI Ingredient Detection</h3>
                            <p className="text-[#8b9a91] text-[15px] leading-[1.6] m-0">Snap a photo of your fridge or pantry. Our AI identifies every ingredient instantly with computer vision.</p>
                        </div>
                        <div className="bg-[linear-gradient(180deg,rgba(20,30,24,0.6)_0%,rgba(12,18,14,0.8)_100%)] border border-[rgba(255,255,255,0.03)] rounded-3xl py-10 px-8 transition-transform duration-300 hover:-translate-y-2 hover:border-[rgba(0,255,102,0.2)]">
                            <div className="w-12 h-12 bg-[rgba(0,255,102,0.1)] rounded-xl flex items-center justify-center mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                            </div>
                            <h3 className="text-xl m-0 mb-3">Health-Based Suggestions</h3>
                            <p className="text-[#8b9a91] text-[15px] leading-[1.6] m-0">Get recipes tailored to your health goals, whether it's low-carb, diabetic-friendly, or strictly gluten-free.</p>
                        </div>
                        <div className="bg-[linear-gradient(180deg,rgba(20,30,24,0.6)_0%,rgba(12,18,14,0.8)_100%)] border border-[rgba(255,255,255,0.03)] rounded-3xl py-10 px-8 transition-transform duration-300 hover:-translate-y-2 hover:border-[rgba(0,255,102,0.2)]">
                            <div className="w-12 h-12 bg-[rgba(0,255,102,0.1)] rounded-xl flex items-center justify-center mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <h3 className="text-xl m-0 mb-3">Smart Personalization</h3>
                            <p className="text-[#8b9a91] text-[15px] leading-[1.6] m-0">The more you cook, the better we get. Our engine learns your taste preferences and dietary restrictions.</p>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section className="py-20 px-[10%] relative max-w-[1400px] mx-auto w-full box-border pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-15 gap-5 md:gap-0">
                        <div>
                            <h2 className="text-4xl m-0 mb-4 leading-[1.2]">Simple Steps to<br />Delicious Healthy Meals</h2>
                            <p className="color-[#8b9a91] m-0">We've streamlined the entire cooking process from discovery to plating.</p>
                        </div>
                        <button className="bg-transparent text-white border border-[rgba(255,255,255,0.2)] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] hover:border-white">
                            See the Full Guide
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0">
                        <div className="flex-1 text-center relative px-5">
                            <div className="w-12 h-12 bg-[#00ff84] color-[#000] rounded-full flex items-center justify-center font-bold text-base mx-auto mb-6 text-black">01</div>
                            <h3 className="text-xl m-0 mb-3">Upload or Enter</h3>
                            <p className="text-[#8b9a91] text-[15px] leading-[1.6] m-0">List what you have or upload a photo of your ingredients.</p>
                        </div>
                        <div className="hidden md:block w-[60px] h-px bg-[rgba(255,255,255,0.1)] mt-6"></div>
                        <div className="flex-1 text-center relative px-5">
                            <div className="w-12 h-12 bg-[#00ff84] color-[#000] rounded-full flex items-center justify-center font-bold text-base mx-auto mb-6 text-black">02</div>
                            <h3 className="text-xl m-0 mb-3">AI Analysis</h3>
                            <p className="text-[#8b9a91] text-[15px] leading-[1.6] m-0">Our AI filters through thousands of recipes based on your profile.</p>
                        </div>
                        <div className="hidden md:block w-[60px] h-px bg-[rgba(255,255,255,0.1)] mt-6"></div>
                        <div className="flex-1 text-center relative px-5">
                            <div className="w-12 h-12 bg-[#00ff84] color-[#000] rounded-full flex items-center justify-center font-bold text-base mx-auto mb-6 text-black">03</div>
                            <h3 className="text-xl m-0 mb-3">Cook & Enjoy</h3>
                            <p className="text-[#8b9a91] text-[15px] leading-[1.6] m-0">Get step-by-step instructions for a personalized healthy meal.</p>
                        </div>
                    </div>
                </section>

                {/* CTA BOX SECTION */}
                <section className="py-20 px-[10%] relative max-w-[1400px] mx-auto w-full box-border pb-20">
                    <div className="bg-[#00ff84] rounded-4xl py-20 px-10 text-center text-black">
                        <h2 className="text-5xl font-extrabold m-0 mb-6">Ready to Cook Smarter?</h2>
                        <p className="text-lg max-w-[600px] mx-auto mb-10 leading-[1.6]">Join thousands of people who are using Recipro to transform their diet and live a healthier lifestyle through better cooking.</p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => navigate("/register")} className="bg-[#0b110d] text-white border-none py-4 px-8 rounded-xl font-bold cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
                                Start Cooking Now
                            </button>
                            <button onClick={() => navigate("/register")} className="bg-white text-[#0b110d] border-none py-4 px-8 rounded-xl font-bold cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </section>

                {/* FOOTER SECTION */}
                <footer className="border-t border-[rgba(255,255,255,0.05)] pt-20 px-[10%] pb-10 max-w-[1400px] mx-auto w-full box-border">
                    <div className="flex flex-col lg:flex-row justify-between gap-15 mb-15">
                        <div className="flex-1 max-w-[300px]">
                            <div className="flex items-center gap-3 text-xl font-bold">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#00ff84]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                                        <line x1="6" y1="17" x2="18" y2="17" />
                                    </svg>
                                </div>
                                <span className="text-white text-xl font-bold">Recipro</span>
                            </div>
                            <p className="text-[#8b9a91] text-sm leading-[1.6] my-5">
                                Empowering your kitchen with the intelligence of tomorrow. Healthy eating, simplified by AI.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" aria-label="Twitter" className="text-[#8b9a91] transition-colors duration-200 hover:text-[#00ff84]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="text-[#8b9a91] transition-colors duration-200 hover:text-[#00ff84]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                </a>
                                <a href="#" aria-label="Facebook" className="text-[#8b9a91] transition-colors duration-200 hover:text-[#00ff84]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-10 lg:gap-15">
                            <div>
                                <h4 className="m-0 mb-6 text-base">Product</h4>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Features</a>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">AI Engine</a>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Recipe Database</a>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Mobile App</a>
                            </div>
                            <div>
                                <h4 className="m-0 mb-6 text-base">Support</h4>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Help Center</a>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Terms of Service</a>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Privacy Policy</a>
                                <a href="#" className="block text-[#8b9a91] no-underline mb-3 text-sm transition-colors duration-200 hover:text-[#00ff84]">Cookie Settings</a>
                            </div>
                            <div className="max-w-[280px]">
                                <h4 className="m-0 mb-6 text-base">Newsletter</h4>
                                <p className="text-[#8b9a91] text-sm mb-4 leading-[1.5]">Get weekly healthy recipes and kitchen tips.</p>
                                <div className="flex bg-[rgba(255,255,255,0.05)] rounded-lg p-1">
                                    <input type="email" placeholder="Enter your email" className="bg-transparent border-none text-white py-2 px-3 outline-none w-full" />
                                    <button className="bg-[#00ff84] border-none text-black py-2 px-4 rounded-md font-bold cursor-pointer">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 text-center text-[#8b9a91] text-sm">
                        <p>© 2026 Recipro. All rights reserved.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage;
