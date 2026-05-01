import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../../store/recipeStore';
import { useAuth } from '../../hooks/useAuth';
import { getSavedRecipesService } from '../../services/recipeService';

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

const tabs = ["All Recipes", "Favorites", "Created by Me", "Folders"];

const SavedRecipe = () => {
    const { userId } = useAuth();
    const { savedRecipes, setSavedRecipes } = useRecipeStore();

    useEffect(() => {
        if (userId) {
            getSavedRecipesService(userId)
                .then(res => {
                    if (res.success) {
                        setSavedRecipes(res.data);
                    }
                })
                .catch(console.error);
        }
    }, [userId, setSavedRecipes]);

    return (
        <div className="flex flex-col gap-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Saved Recipes</h1>
                    <p className="text-gray-400">Your personal collection of favorite recipes.</p>
                </div>

            </div>



            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedRecipes.map((recipe, index) => (
                    <Link
                        to={`/recipe/${recipe.recipeId || recipe.id}`}
                        key={`${recipe.recipeId || recipe.id}-${index}`}
                        className="group relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-[#0A2A1E] hover:border-[#00E676]/30 transition-all cursor-pointer block text-left"
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
                    </Link>
                ))}
            </div>

            {savedRecipes.length === 0 && (
                <div className="text-center text-gray-500 py-20">
                    <p className="text-xl">You haven't saved any recipes yet!</p>
                    <p className="mt-2 text-sm">Explore and bookmark your favorites.</p>
                </div>
            )}
        </div>
    );
};

export default SavedRecipe;