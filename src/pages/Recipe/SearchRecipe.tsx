import { useState } from 'react';

// Icons using custom SVGs to match the project's style
const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CameraIcon = () => (
    <svg className="w-6 h-6 text-[#03100B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const HistoryIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
    <svg className={`w-5 h-5 ${filled ? 'fill-red-500 text-red-500' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const ChefHatIcon = () => (
    <svg className="w-6 h-6 text-[#03100B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C9 2 7.034 4 7.034 6A3.996 3.996 0 004 9.5C4 11.233 5.023 12.721 6.5 13.33V19C6.5 20.104 7.396 21 8.5 21H15.5C16.604 21 17.5 20.104 17.5 19V13.33C18.977 12.721 20 11.233 20 9.5A3.996 3.996 0 0016.966 6C16.966 4 15 2 12 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.5 17H17.5" />
    </svg>
);

const recipes = [
    {
        id: 1,
        title: "Zesty Lemon Chicken Salad",
        match: 98,
        time: "15 min",
        calories: "350 kcal",
        tags: ["KETO", "HIGH PROTEIN"],
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
        id: 2,
        title: "Avocado Toast with Egg",
        match: 95,
        time: "10 min",
        calories: "420 kcal",
        tags: ["KETO", "HIGH PROTEIN"],
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400&h=300"
    }
];

const categories = ["All", "Breakfast", "High Protein", "Keto", "Gluten-Free", "Under 30min", "Dinner"];

const recentSearches = ["Avocado Toast", "Chicken Breast", "Smoothie Bowl"];

const SearchRecipe = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Header Section */}
            <div>
                <h1 className="text-4xl font-bold mb-2">Discover</h1>
                <p className="text-gray-400">Find recipes based on what's in your kitchen.</p>
            </div>

            {/* Search Bar Section */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search recipes, ingredients..."
                        className="w-full bg-[#061B12] border border-[#0A2A1E] rounded-2xl py-5 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 transition-all"
                    />
                </div>
                <button className="bg-[#00E676] p-5 rounded-2xl hover:bg-[#00C853] transition-colors shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                    <CameraIcon />
                </button>
            </div>

            {/* Filter Section */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all border ${selectedCategory === cat
                            ? 'bg-[#00E676] border-[#00E676] text-[#03100B] font-bold shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                            : 'bg-[#061B12] border-[#0A2A1E] text-gray-400 hover:text-white hover:border-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
                <button className="flex items-center gap-2 px-6 py-3 bg-[#061B12] border border-[#0A2A1E] rounded-xl text-gray-400 hover:text-white transition-all ml-auto">
                    <FilterIcon />
                    <span>Filters</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Recommended Section */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-6">Recommended for you</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="bg-[#061B12] rounded-3xl overflow-hidden border border-[#0A2A1E] group hover:border-[#00E676]/30 transition-all">
                                <div className="relative aspect-[4/3]">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Match Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-[#00E676] px-3 py-1.5 rounded-full text-[#03100B] text-xs font-bold shadow-lg">
                                        <div className="w-4 h-4 flex items-center justify-center">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </div>
                                        {recipe.match}% Match
                                    </div>
                                    {/* Favorite Button */}
                                    <button className="absolute top-4 right-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-[#00E676] hover:text-[#03100B] transition-all">
                                        <HeartIcon />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-4">{recipe.title}</h3>
                                    <div className="flex items-center gap-6 text-gray-400 text-sm mb-6">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#00E676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {recipe.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#00E676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14l2.828 2.828z" />
                                            </svg>
                                            {recipe.calories}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {recipe.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1.5 bg-[#03100B] border border-[#0A2A1E] rounded-lg text-[10px] font-bold tracking-wider text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Section */}
                <div className="lg:w-80 flex flex-col gap-8">
                    {/* Recent Searches */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Recent Searches</h2>
                            <button className="text-[#00E676] text-xs font-bold hover:underline">Clear</button>
                        </div>
                        <div className="space-y-3">
                            {recentSearches.map((search) => (
                                <button key={search} className="w-full flex items-center justify-between p-5 bg-[#061B12] border border-[#0A2A1E] rounded-2xl hover:border-[#00E676]/30 transition-all group">
                                    <div className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors">
                                        <HistoryIcon />
                                        <span className="font-medium">{search}</span>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-500 group-hover:text-[#00E676] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Assistant Card */}
                    <div className="p-8 bg-[#061B12] border border-[#0A2A1E] rounded-3xl relative overflow-hidden group">
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E676]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00E676]/20 transition-all"></div>

                        <div className="bg-[#00E676] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                            <ChefHatIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Try AI Assistant</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Chat with our Chef AI to get personalized recipe modifications and cooking tips.
                        </p>
                        <button className="w-full bg-[#00E676] text-[#03100B] font-bold py-4 rounded-2xl hover:bg-[#00C853] transition-all active:scale-[0.98] shadow-lg shadow-[#00E676]/10">
                            Start Chatting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchRecipe;