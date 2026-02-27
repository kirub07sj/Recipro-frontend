import React, { useState } from 'react';

const MOCK_RECIPES = [
    {
        id: 1,
        title: "Zesty Lemon Chicken Salad",
        rating: 4.8,
        time: "15 min",
        calories: "350 kcal",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Avocado Toast with Egg",
        rating: 4.9,
        time: "10 min",
        calories: "420 kcal",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Spicy Quinoa Bowl",
        rating: 4.7,
        time: "20 min",
        calories: "450 kcal",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Berry Acai Smoothie",
        rating: 4.9,
        time: "5 min",
        calories: "280 kcal",
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

const HomePage = () => {
    const [showAllRecipes, setShowAllRecipes] = useState(false);

    return (
        <div className="flex h-screen bg-[#0b110d] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[260px] bg-[#080d0a] border-r border-white/5 flex flex-col p-6">
                <div className="flex items-center gap-3 text-2xl font-bold mb-10">
                    <div className="w-9 h-9 bg-[#00ff84] rounded-[10px] flex items-center justify-center text-black">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                            <line x1="6" y1="17" x2="18" y2="17" />
                        </svg>
                    </div>
                    <span>Recipro</span>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    <a href="#" className="flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors bg-[#00ff84]/10 text-[#00ff84] text-[15px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        Home
                    </a>
                    <a href="#" className="flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium text-[#8b9a91] hover:text-white hover:bg-white/5 transition-colors text-[15px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        Discover
                    </a>
                    <a href="#" className="flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium text-[#8b9a91] hover:text-white hover:bg-white/5 transition-colors text-[15px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        My Cookbook
                    </a>
                    <a href="#" className="flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium text-[#8b9a91] hover:text-white hover:bg-white/5 transition-colors text-[15px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                        Favorites
                    </a>
                    <a href="#" className="flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium text-[#8b9a91] hover:text-white hover:bg-white/5 transition-colors text-[15px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        Profile
                    </a>
                </nav>

                <div className="flex flex-col gap-4 mt-auto">
                    <a href="#" className="flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium text-[#8b9a91] hover:text-white hover:bg-white/5 transition-colors text-[15px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                        Settings
                    </a>

                    <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Alex Doe" className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <h4 className="font-semibold text-sm m-0">Alex Doe</h4>
                            <p className="text-[10px] font-bold text-[#00ff84] mt-0.5 mb-0 tracking-wide">HEALTH SCORE: 85</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full p-10">
                <header className="flex justify-between items-start mb-10">
                    <div>
                        <p className="text-[#8b9a91] text-base mb-1">Good Evening</p>
                        <h1 className="text-4xl font-bold flex items-center">Ready to cook, Alex?</h1>
                        <span className="inline-flex items-center gap-1.5 py-1.5 px-3 border border-[#00ff84]/30 rounded-full text-[#00ff84] text-xs font-semibold mt-3">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                            Low Carb Profile Active
                        </span>
                    </div>
                    <button className="w-11 h-11 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 hover:text-[#00ff84] transition-colors" aria-label="Notifications">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
                    {/* Hero Card */}
                    <div className="bg-[#00ff84] rounded-[32px] p-10 text-[#080d0a] flex flex-col justify-between relative overflow-hidden min-h-[280px]">
                        <div className="absolute -right-5 -bottom-5 w-[200px] h-[200px] opacity-10 bg-[radial-gradient(#000_20%,transparent_20%),radial-gradient(#000_20%,transparent_20%)] [background-position:0_0,10px_10px] [background-size:20px_20px]"></div>
                        <h2 className="text-[40px] font-extrabold leading-[1.1] max-w-[300px] relative z-10 m-0">What's in your fridge today?</h2>
                        <button className="bg-[#080d0a] text-[#00ff84] py-4 px-6 rounded-2xl font-bold text-base inline-flex items-center gap-3 w-fit mt-8 hover:-translate-y-0.5 hover:bg-[#0a110d] transition-all relative z-10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                            <span className="flex flex-col items-start leading-tight">
                                Snap Ingredients
                                <span className="text-[11px] text-[#4CAF50] font-medium mt-0.5">Use camera to scan food</span>
                            </span>
                        </button>
                    </div>

                    {/* Action Cards */}
                    <div className="flex flex-col gap-5">
                        <div className="bg-[#111a14] rounded-3xl p-6 flex items-center justify-between cursor-pointer border border-white/5 flex-1 hover:bg-[#15221a] hover:border-[#00ff84]/20 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#0a0f0c] rounded-2xl flex items-center justify-center text-[#00ff84]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                </div>
                                <div>
                                    <h3 className="m-0 mb-1 text-lg font-semibold">Upload Photo</h3>
                                    <p className="m-0 text-[13px] text-[#8b9a91]">Analyze gallery items</p>
                                </div>
                            </div>
                            <svg className="text-[#4a5c53] group-hover:text-[#00ff84] transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </div>

                        <div className="bg-[#111a14] rounded-3xl p-6 flex items-center justify-between cursor-pointer border border-white/5 flex-1 hover:bg-[#15221a] hover:border-[#00ff84]/20 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#0a0f0c] rounded-2xl flex items-center justify-center text-[#00ff84]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
                                </div>
                                <div>
                                    <h3 className="m-0 mb-1 text-lg font-semibold">Recent Scans</h3>
                                    <p className="m-0 text-[13px] text-[#8b9a91]">Quickly cook it again</p>
                                </div>
                            </div>
                            <svg className="text-[#4a5c53] group-hover:text-[#00ff84] transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </div>
                    </div>
                </div>

                {/* Recipes Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold m-0">Cook it again</h2>
                        <button className="text-sm font-semibold flex flex-row items-center cursor-pointer gap-2" onClick={() => setShowAllRecipes(!showAllRecipes)}>
                            {showAllRecipes ? 'View less' : 'View all'}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-300 ${showAllRecipes ? 'rotate-180' : 'rotate-0'}`}
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>

                    <div className={showAllRecipes ? "flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"}>
                        {(showAllRecipes ? MOCK_RECIPES : MOCK_RECIPES.slice(0, 2)).map((recipe) => (
                            <div key={recipe.id} className={`bg-[#111a14] rounded-3xl overflow-hidden cursor-pointer border border-white/5 transition-all hover:-translate-y-1 hover:border-white/10 group ${showAllRecipes ? 'min-w-[300px] flex-[0_0_auto] snap-start' : ''}`}>
                                <div className="w-full h-[200px] relative overflow-hidden">
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 text-white z-10">
                                        <svg className="text-[#ffb400]" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                        {recipe.rating}
                                    </div>
                                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5">
                                    <h3 className="m-0 mb-3 text-lg font-semibold">{recipe.title}</h3>
                                    <div className="flex gap-4 text-[#8b9a91] text-[13px] font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                            {recipe.time}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
                                            {recipe.calories}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;