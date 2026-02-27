import React from 'react';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0b110d] text-white font-sans flex flex-col relative overflow-hidden before:content-[''] before:absolute before:-top-[20%] before:-right-[10%] before:w-[60%] before:h-[80%] before:bg-[radial-gradient(circle,rgba(0,255,132,0.08)_0%,rgba(0,0,0,0)_70%)] before:rounded-full before:pointer-events-none before:z-0">
            <nav className="flex justify-between items-center py-8 px-16 relative z-10">
                <div className="flex items-center gap-3 text-2xl font-bold">
                    <div className="w-9 h-9 bg-[#00ff84] rounded-[10px] flex items-center justify-center text-black">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                            <line x1="6" y1="17" x2="18" y2="17" />
                        </svg>
                    </div>
                    <span>Recipro</span>
                </div>

                <div className="flex gap-4 items-center">
                    <button onClick={() => navigate("/login")} className="text-[#8b9a91] hover:text-white hover:bg-white/5 font-medium text-[15px] py-2.5 px-4 rounded-xl transition-all duration-200 bg-transparent border-none">
                        Log in
                    </button>
                    <button onClick={() => navigate("/register")} className="bg-[#00ff84] hover:bg-[#33ff9d] hover:-translate-y-0.5 text-[#080d0a] font-bold text-[15px] py-3 px-6 rounded-xl transition-all duration-200">
                        Sign up
                    </button>
                </div>
            </nav>

            <section className="flex-1 flex items-center px-16 relative z-10">
                <div className="max-w-[600px]">
                    <div className="inline-flex items-center gap-2 bg-[#00ff84]/10 text-[#00ff84] py-2 px-4 rounded-full text-[13px] font-semibold mb-6 border border-[#00ff84]/20">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        Personalized AI Recipe Generator
                    </div>

                    <h1 className="text-[56px] font-extrabold leading-[1.1] text-white mb-6">
                        Healthy meals,<br />
                        tailored for <span className="text-[#00ff84]">you.</span>
                    </h1>

                    <p className="text-[18px] leading-[1.6] text-[#8b9a91] mb-10 max-w-[500px]">
                        Discover and generate delicious recipes that perfectly match your dietary needs, preferences, and whatever ingredients you have in your fridge right now.
                    </p>

                    <div className="flex gap-4">
                        <button onClick={() => navigate("/register")} className="bg-[#00ff84] hover:bg-[#33ff9d] text-[#080d0a] font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-base flex items-center gap-2">
                            Get Started Free
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </button>
                        <button onClick={() => navigate("/home")} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00ff84]/30 font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-base">
                            View Demo
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex justify-center items-center relative">
                    <div className="grid grid-cols-2 gap-6 relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[300px] after:h-[300px] after:bg-[#00ff84] after:blur-[100px] after:opacity-15 after:-z-10">
                        <div className="bg-[#111a14]/80 backdrop-blur-md border border-white/5 rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#00ff84]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                            <div className="w-14 h-14 bg-[#00ff84]/10 text-[#00ff84] rounded-2xl flex items-center justify-center mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Snap & Cook</h3>
                            <p className="text-[14px] text-[#8b9a91] leading-[1.5]">Take a photo of your fridge and let our AI generate the perfect meal with what you have.</p>
                        </div>

                        <div className="bg-[#111a14]/80 backdrop-blur-md border border-white/5 rounded-[24px] p-8 transition-all duration-300 hover:border-[#00ff84]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] translate-y-10 hover:translate-y-8">
                            <div className="w-14 h-14 bg-[#00ff84]/10 text-[#00ff84] rounded-2xl flex items-center justify-center mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Track Macros</h3>
                            <p className="text-[14px] text-[#8b9a91] leading-[1.5]">Every recipe comes with detailed nutritional information to hit your targets.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;