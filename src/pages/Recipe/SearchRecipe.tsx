import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchMealsByNameService, listMealsByLetterService, getRandomMealService, filterMealsByDietService } from '../../services/discoveryService';
import { motion, AnimatePresence } from 'framer-motion';

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

const categories = ["All", "Low Carb", "High Protein", "Vegetarian", "Vegan"];

const SearchRecipe = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [recipes, setRecipes] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('recentSearches');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        // Initial load: fetch some default meals
        fetchMealsByLetter('c');
    }, []);

    const fetchMealsByLetter = async (letter: string) => {
        setLoading(true);
        const data = await listMealsByLetterService(letter);
        setRecipes(data || []);
        setLoading(false);
    };

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeSearch(searchQuery);
        }
    };

    const executeSearch = async (query: string) => {
        if (!query.trim()) {
            fetchMealsByLetter('c');
            return;
        }

        // Add to history
        const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem('recentSearches', JSON.stringify(newHistory));

        setLoading(true);
        const data = await searchMealsByNameService(query);
        setRecipes(data || []);
        setLoading(false);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('recentSearches');
    };

    const handleCategoryClick = async (cat: string) => {
        setSelectedCategory(cat);
        setLoading(true);
        if (cat === "All") {
            await fetchMealsByLetter('c');
        } else {
            const data = await filterMealsByDietService(cat);
            setRecipes(data || []);
            setLoading(false);
        }
    };

    const handleRandomMealClick = async () => {
        setLoading(true);
        const meal = await getRandomMealService();
        if (meal) {
            setRecipes([meal]);
        }
        setLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-8 pb-12"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants}>
                <h1 className="text-4xl font-bold mb-2">Discover</h1>
                <p className="text-gray-400">Find recipes based on what's in your kitchen.</p>
            </motion.div>

            {/* Search Bar Section */}
            <motion.div variants={itemVariants} className="flex gap-4">
                <div className="flex-1 relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Search recipes (e.g., Arrabiata), press Enter..."
                        className="w-full bg-[#061B12] border border-[#0A2A1E] rounded-2xl py-5 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 transition-all"
                    />
                </div>

            </motion.div>

            {/* Filter Section */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <motion.button
                        key={cat}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all border ${selectedCategory === cat
                            ? 'bg-[#00E676] border-[#00E676] text-[#03100B] font-bold shadow-[0_0_15px_rgba(0,230,118,0.2)]'
                            : 'bg-[#061B12] border-[#0A2A1E] text-gray-400 hover:text-white hover:border-gray-700'
                            }`}
                    >
                        {cat}
                    </motion.button>
                ))}

            </motion.div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Recommended Section */}
                <div className="flex-1">
                    <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">Recommended for you</motion.h2>
                    {loading ? (
                        <div className="text-[#00E676] font-bold animate-pulse">Loading recipes...</div>
                    ) : recipes.length === 0 ? (
                        <motion.div variants={itemVariants} className="text-gray-400">No recipes found. Try another search.</motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {recipes.map((recipe, index) => (
                                    <motion.div
                                        key={recipe.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={`/recipe/${recipe.id}?source=discovery`}
                                            className="bg-[#061B12] h-full rounded-3xl overflow-hidden border border-[#0A2A1E] group hover:border-[#00E676]/30 transition-all block text-left flex flex-col"
                                        >
                                            <div className="relative aspect-[4/3] shrink-0">
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
                                                    {recipe.match || ''}% Match
                                                </div>
                                                {/* Favorite Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-[#00E676] hover:text-[#03100B] transition-all"
                                                >
                                                    <HeartIcon />
                                                </motion.button>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className="text-xl text-[#fff] font-bold mb-4 line-clamp-2">{recipe.title}</h3>
                                                <div className="flex items-center gap-6 text-gray-400 text-sm mb-6 mt-auto">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-[#00E676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {recipe.time || '45 mins'}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-[#00E676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14l2.828 2.828z" />
                                                        </svg>
                                                        {recipe.calories || '450 kcal'}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 flex-wrap">
                                                    {(recipe.tags || []).slice(0, 3).map((tag: string) => (
                                                        <span key={tag} className="px-3 py-1.5 bg-[#03100B] border border-[#0A2A1E] rounded-lg text-[10px] font-bold tracking-wider text-gray-300">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                {/* Sidebar Section */}
                <motion.div variants={itemVariants} className="lg:w-80 flex flex-col gap-8">
                    {/* Recent Searches */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Recent Searches</h2>
                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="text-[#041A0B] bg-[#00E676] text-xs font-bold hover:underline"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="space-y-3">
                            {history.map((search) => (
                                <motion.button
                                    key={search}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setSearchQuery(search);
                                        executeSearch(search);
                                    }}
                                    className="w-full flex items-center justify-between p-5 bg-[#061B12] border border-[#0A2A1E] rounded-2xl hover:border-[#00E676]/30 transition-all group"
                                >
                                    <div className="flex items-center gap-4 text-gray-300 group-hover:text-white transition-colors">
                                        <HistoryIcon />
                                        <span className="font-medium">{search}</span>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-500 group-hover:text-[#00E676] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* AI Assistant Card (Repurposed for Random Meal) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 bg-[#061B12] border border-[#0A2A1E] rounded-3xl relative overflow-hidden group"
                    >
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E676]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00E676]/20 transition-all"></div>

                        <div className="bg-[#00E676] w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                            <ChefHatIcon />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Feeling Adventurous?</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Let us pick a random recipe for you to cook today!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRandomMealClick}
                            className="w-full bg-[#00E676] text-[#03100B] font-bold py-4 rounded-2xl hover:bg-[#00C853] transition-all shadow-lg shadow-[#00E676]/10"
                        >
                            Get Random Meal
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );

};

export default SearchRecipe;