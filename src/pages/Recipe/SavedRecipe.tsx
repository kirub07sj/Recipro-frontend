import { useState } from 'react';

// Icons
const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const ClockIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const savedRecipes = [
    {
        id: 1,
        title: "Zesty Lemon Chicken Salad",
        time: "15 MIN",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 2,
        title: "Avocado Toast with Egg",
        time: "10 MIN",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 3,
        title: "Quinoa Power Bowl",
        time: "25 MIN",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 4,
        title: "Berry Smoothie Bowl",
        time: "5 MIN",
        image: "https://images.unsplash.com/photo-1494597564530-859f0b15705c?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 5,
        title: "Zesty Lemon Chicken Salad",
        time: "15 MIN",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 6,
        title: "Avocado Toast with Egg",
        time: "10 MIN",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 7,
        title: "Quinoa Power Bowl",
        time: "25 MIN",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=500"
    },
    {
        id: 8,
        title: "Berry Smoothie Bowl",
        time: "5 MIN",
        image: "https://images.unsplash.com/photo-1494597564530-859f0b15705c?auto=format&fit=crop&q=80&w=400&h=500"
    }
];

const tabs = ["All Recipes", "Favorites", "Created by Me", "Folders"];

const SavedRecipe = () => {
    const [activeTab, setActiveTab] = useState("All Recipes");

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Saved Recipes</h1>
                    <p className="text-gray-400">Your personal collection of favorite recipes.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-3 bg-[#061B12] border border-[#0A2A1E] rounded-xl hover:bg-[#0A2A1E] transition-all text-gray-400 hover:text-white">
                        <SearchIcon />
                    </button>
                    <button className="flex items-center gap-2 bg-[#00E676] px-6 py-3 rounded-xl text-[#03100B] font-bold hover:bg-[#00C853] transition-all shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                        <PlusIcon />
                        <span>Create New</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-8 border-b border-[#0A2A1E]">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab
                            ? 'text-white'
                            : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E676] shadow-[0_0_10px_rgba(0,230,118,0.5)]"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedRecipes.map((recipe, index) => (
                    <div
                        key={`${recipe.id}-${index}`}
                        className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-[#0A2A1E] hover:border-[#00E676]/30 transition-all cursor-pointer"
                    >
                        {/* Background Image */}
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="flex items-center gap-1.5 text-[#00E676] font-bold text-[0.65rem] tracking-widest mb-2">
                                <ClockIcon />
                                <span>{recipe.time}</span>
                            </div>
                            <h3 className="text-white text-lg font-bold leading-tight group-hover:text-[#00E676] transition-colors">
                                {recipe.title}
                            </h3>
                        </div>

                        {/* Subtle Border Glow on Hover */}
                        <div className="absolute inset-0 border-2 border-[#00E676]/0 group-hover:border-[#00E676]/10 rounded-[2rem] transition-all pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedRecipe;