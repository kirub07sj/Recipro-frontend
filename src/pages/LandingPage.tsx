import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#00ff73] selection:text-[#011c14]"
      style={{ backgroundColor: "rgb(1, 28, 20)", color: "rgb(255, 255, 255)" }}
    >
      <nav className="fixed h-[85px] top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/20 backdrop-blur-md py-6 text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#00ff73] p-1.5 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chef-hat text-[#011c14] w-6 h-6"
                aria-hidden="true"
              >
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
                <path d="M6 17h12"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Recipro</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-white text-sm font-medium hover:text-[#00ff73] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-white text-sm font-medium hover:text-[#00ff73] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-white text-sm font-medium hover:text-[#00ff73] transition-colors"
            >
              Testimonials
            </a>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium px-5 py-2 hover:bg-white/5 rounded-full transition-all bg-black/0 hover:outline-none
              "
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-bold px-6 py-2.5 bg-[#00ff73] text-[#011c14] rounded-full hover:shadow-[0_0_20px_rgba(0,255,115,0.4)] transition-all"
            >
              Get Started
            </button>
          </div>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
              aria-hidden="true"
            >
              <path d="M4 12h16"></path>
              <path d="M4 18h16"></path>
              <path d="M4 6h16"></path>
            </svg>
          </button>
        </div>
      </nav>
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div style={{ opacity: "1", transform: "none" }}>
            <div className="inline-flex items-center gap-2 bg-[#00ff73]/10 border border-[#00ff73]/20 px-4 py-1.5 rounded-full text-[#00ff73] text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff73] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff73]"></span>
              </span>
              Next-Gen AI Cooking Assistant
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Turn Your Ingredients Into{" "}
              <span className="text-[#00ff73]">Healthy Recipes</span> with AI
            </h1>
            <p
              className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed"
              style={{ color: "rgb(139, 161, 155)" }}
            >
              Upload ingredients or type what you have, and get personalized
              recipes based on your health conditions and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className="group px-8 py-4 bg-[#00ff73] text-[#011c14] font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,255,115,0.3)] transition-all"
              >
                Get Started Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button className="px-8 py-4 border border-white/10 hover:bg-white/5 font-bold rounded-2xl transition-all">
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#011c14] bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <img
                    alt="user"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#011c14] bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <img
                    alt="user"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=12"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#011c14] bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <img
                    alt="user"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=13"
                  />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#011c14] bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <img
                    alt="user"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=14"
                  />
                </div>
              </div>
              <p className="text-sm" style={{ color: "rgb(139, 161, 155)" }}>
                Joined by <span className="text-white font-bold">10k+</span>{" "}
                home chefs
              </p>
            </div>
          </div>
          <div className="relative" style={{ opacity: "1", transform: "none" }}>
            <div className="relative z-10 bg-[#052b21] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff73]/20 blur-3xl -z-10"></div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Hi, Alex.</h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(139, 161, 155)" }}
                  >
                    What are we cooking today?
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#00ff73]/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search w-6 h-6 text-[#00ff73]"
                    aria-hidden="true"
                  >
                    <path d="m21 21-4.34-4.34"></path>
                    <circle cx="11" cy="11" r="8"></circle>
                  </svg>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-[#011c14] p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Enter Ingredients</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-utensils w-5 h-5 text-[#00ff73]/50"
                      aria-hidden="true"
                    >
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                      <path d="M7 2v20"></path>
                      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                    </svg>
                  </div>
                  <div
                    className="text-sm mb-4"
                    style={{ color: "rgb(139, 161, 155)" }}
                  >
                    e.g. 2 eggs, avocado, sourdough bread...
                  </div>
                  <button className="w-full py-3 bg-[#00ff73] text-[#011c14] font-bold rounded-xl flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chef-hat w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
                      <path d="M6 17h12"></path>
                    </svg>{" "}
                    Generate Recipes
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-camera w-5 h-5 text-[#00ff73]"
                        aria-hidden="true"
                      >
                        <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                        <circle cx="12" cy="13" r="3"></circle>
                      </svg>
                    </div>
                    <span className="text-xs font-medium">Scan Fridge</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart-pulse w-5 h-5 text-[#00ff73]"
                        aria-hidden="true"
                      >
                        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                        <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium">Health Profile</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#00ff73]/10 blur-[80px] -z-10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 blur-[80px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Master Your Kitchen with AI
            </h2>
            <p
              className="max-w-2xl mx-auto text-lg"
              style={{ color: "rgb(139, 161, 155)" }}
            >
              Our platform combines cutting-edge AI with nutrition science to
              help you eat better, waste less, and enjoy every meal.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-[#052b21] p-10 rounded-[2rem] border border-white/5 group hover:border-[#00ff73]/30 transition-all duration-300"
              style={{ transform: "none" }}
            >
              <div className="w-16 h-16 bg-[#00ff73]/10 rounded-2xl flex items-center justify-center text-[#00ff73] mb-8 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-camera w-8 h-8"
                  aria-hidden="true"
                >
                  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                AI Ingredient Detection
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                Snap a photo of your fridge or pantry. Our AI identifies every
                ingredient instantly with computer vision.
              </p>
            </div>
            <div
              className="bg-[#052b21] p-10 rounded-[2rem] border border-white/5 group hover:border-[#00ff73]/30 transition-all duration-300"
              style={{ transform: "none" }}
            >
              <div className="w-16 h-16 bg-[#00ff73]/10 rounded-2xl flex items-center justify-center text-[#00ff73] mb-8 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart-pulse w-8 h-8"
                  aria-hidden="true"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Health-Based Suggestions
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                Get recipes tailored to your health goals—whether it's low-carb,
                diabetic-friendly, or strictly gluten-free.
              </p>
            </div>
            <div className="bg-[#052b21] p-10 rounded-[2rem] border border-white/5 group hover:border-[#00ff73]/30 transition-all duration-300">
              <div className="w-16 h-16 bg-[#00ff73]/10 rounded-2xl flex items-center justify-center text-[#00ff73] mb-8 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-settings w-8 h-8"
                  aria-hidden="true"
                >
                  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Personalization</h3>
              <p
                className="leading-relaxed"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                The more you cook, the better we get. Our engine learns your
                taste preferences and dietary restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Simple Steps to <br />
                Delicious Healthy Meals
              </h2>
              <p className="text-lg" style={{ color: "rgb(139, 161, 155)" }}>
                We've streamlined the entire cooking process from discovery to
                plating.
              </p>
            </div>
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
              See the Full Guide{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right w-4 h-4"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#00ff73] text-[#011c14] font-black rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,255,115,0.4)]">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4">Upload or Enter</h3>
              <p
                className="max-w-xs mx-auto"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                List what you have or upload a photo of your ingredients.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#00ff73] text-[#011c14] font-black rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,255,115,0.4)]">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Analysis</h3>
              <p
                className="max-w-xs mx-auto"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                Our AI filters through thousands of recipes based on your
                profile.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#00ff73] text-[#011c14] font-black rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,255,115,0.4)]">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4">Cook &amp; Enjoy</h3>
              <p
                className="max-w-xs mx-auto"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                Get step-by-step instructions for a personalized healthy meal.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="bg-[#00ff73] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
            style={{ opacity: "1", transform: "none" }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, black 1px, transparent 0px)",
                backgroundSize: "24px 24px",
              }}
            ></div>
            <h2 className="text-[#011c14] text-4xl md:text-6xl font-black mb-8 relative z-10">
              Ready to Cook Smarter?
            </h2>
            <p className="text-[#011c14]/70 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto relative z-10">
              Join thousands of people who are using Recipro to transform their
              diet and live a healthier lifestyle through better cooking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button
                onClick={() => navigate("/register")}
                className="px-10 py-5 bg-[#011c14] text-[#00ff73] font-bold rounded-2xl hover:scale-105 transition-all text-lg shadow-xl"
              >
                Start Cooking Now
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-10 py-5 bg-white text-[#011c14] font-bold rounded-2xl hover:bg-[#011c14] hover:text-white transition-all text-lg border border-transparent shadow-xl"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#00ff73] p-1.5 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chef-hat text-[#011c14] w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
                    <path d="M6 17h12"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Recipro
                </span>
              </div>
              <p className="mb-8" style={{ color: "rgb(139, 161, 155)" }}>
                Empowering your kitchen with the intelligence of tomorrow.
                Healthy eating, simplified by AI.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00ff73]/20 hover:text-[#00ff73] transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00ff73]/20 hover:text-[#00ff73] transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram w-5 h-5"
                    aria-hidden="true"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00ff73]/20 hover:text-[#00ff73] transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4" style={{ color: "rgb(255, 255, 255)" }}>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    AI Engine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Recipe Database
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4" style={{ color: "rgb(255, 255, 255)" }}>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00ff73] transition-colors">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p
                className="text-sm mb-6"
                style={{ color: "rgb(139, 161, 155)" }}
              >
                Get weekly healthy recipes and kitchen tips.
              </p>
              <div className="relative">
                <input
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00ff73]/50 transition-colors"
                  type="email"
                />
                <button className="absolute right-2 top-2 bottom-2 px-4 bg-[#00ff73] text-[#011c14] font-bold text-xs rounded-lg">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: "rgb(255, 255, 255)" }}>
              © 2026 Recipro. All rights reserved.
            </p>
            <div
              className="flex gap-8 text-sm"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              <a href="#" className="hover:text-[#00ff73]">
                Privacy
              </a>
              <a href="#" className="hover:text-[#00ff73]">
                Terms
              </a>
              <a href="#" className="hover:text-[#00ff73]">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
