import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../../store/recipeStore';

const RecipeVariants = () => {
    const navigate = useNavigate();
    const { generatedRecipes } = useRecipeStore();

    return (
        <div className="min-h-screen w-full bg-[#051109] text-white p-6 md:p-10 font-sans pb-40">
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                {/* Header */}
                <header className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold">AI Generated Recipes</h1>
                </header>

                <p className="text-gray-400 text-sm md:text-base mb-8 ml-14">
                    Based on your ingredients and health profile, here are recipes tailored just for you:
                </p>

                {(!generatedRecipes || generatedRecipes.length === 0) ? (
                    <div className="text-center text-gray-500 mt-20">
                        No recipes generated yet.
                        <button
                            onClick={() => navigate('/generate-recipe')}
                            className="block mx-auto mt-4 text-[#00ff84] hover:underline"
                        >
                            Go back and generate recipes
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {generatedRecipes.map((recipe, idx) => (
                            <div
                                key={recipe.id || idx}
                                onClick={() => navigate(`/recipe/${recipe.id}`)}
                                className="bg-[#0a1d12] border border-[#00ff84]/10 rounded-3xl overflow-hidden cursor-pointer hover:border-[#00ff84]/40 transition-colors group"
                            >
                                <div className="h-48 w-full relative">
                                    <img
                                        src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400'}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-[#00ff84] text-[#051109] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.29 1.29L3 12l5.8 1.9a2 2 0 0 1 1.29 1.29L12 21l1.9-5.8a2 2 0 0 1 1.29-1.29L21 12l-5.8-1.9a2 2 0 0 1-1.29-1.29L12 3Z" /></svg>
                                        {recipe.match || '95'}% Match
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ff84] transition-colors">{recipe.title}</h3>
                                    <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                                        {recipe.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                            <span className="font-semibold">{recipe.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
                                            <span className="font-semibold">{recipe.calories}</span>
                                        </div>
                                        {recipe.dietary && (
                                            <div className="ml-auto bg-[#00ff84]/10 text-[#00ff84] px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                                                {recipe.dietary}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeVariants;
