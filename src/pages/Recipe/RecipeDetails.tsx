import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
    ChevronLeft, Heart, Clock, Activity,
    Flame, Beef, InfoIcon, CheckCircle2
} from 'lucide-react';

import { mockRecipes } from '../../data/mockRecipes';
import { useRecipeStore } from '../../store/recipeStore';
import { useAuth } from '../../hooks/useAuth';
import { getSavedRecipesService, saveRecipeService, deleteSavedRecipeService } from '../../services/recipeService';
import { lookupMealByIdService } from '../../services/discoveryService';
import { recordRecipeViewService } from '../../services/recentlyViewedService';
import { useEffect } from 'react';
import RecipeDetailsSkeleton from '../../components/skeletons/RecipeDetailsSkeleton';
import { motion } from 'framer-motion';

const RecipeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { 
        generatedRecipes, savedRecipes, setSavedRecipes, 
        addSavedRecipe, removeSavedRecipe, addRecentlyViewed 
    } = useRecipeStore();
    const { userId } = useAuth();

    // State for interactive features
    const [recipeData, setRecipeData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
    const [currentComplexity, setCurrentComplexity] = useState("Intermediate");
    const [currentDietary, setCurrentDietary] = useState("Omnivore");
    const [activePicker, setActivePicker] = useState<'complexity' | 'dietary' | null>(null);

    useEffect(() => {
        let localRecipe = mockRecipes.find(r => r.id === id) || generatedRecipes.find(r => r.id === id) || savedRecipes.find(r => r.recipeId === id);
        if (localRecipe) {
            // Ensure we have a standard id property (saved recipes use recipeId)
            if (!localRecipe.id && localRecipe.recipeId) {
                localRecipe = { ...localRecipe, id: localRecipe.recipeId };
            }
            
            setRecipeData(localRecipe);
            setCurrentComplexity(localRecipe.difficulty || "Intermediate");
            setCurrentDietary(localRecipe.dietary || "Omnivore");
            setLoading(false);
            
            // Record view
            if (userId) {
                addRecentlyViewed(localRecipe);
                recordRecipeViewService(userId, localRecipe).catch(console.error);
            }
        } else if (id) {
            setLoading(true);
            lookupMealByIdService(id).then(res => {
                const fetched = res || mockRecipes[0];
                setRecipeData(fetched);
                setCurrentComplexity(fetched.difficulty || "Intermediate");
                setCurrentDietary(fetched.dietary || "Omnivore");
                setLoading(false);

                // Record view
                if (userId && fetched) {
                    addRecentlyViewed(fetched);
                    recordRecipeViewService(userId, fetched).catch(console.error);
                }
            });
        }
    }, [id, userId, generatedRecipes, savedRecipes]);

    const toggleIngredient = (ingredientId: string) => {
        setSelectedIngredients(prev => {
            const next = new Set(prev);
            if (next.has(ingredientId)) {
                next.delete(ingredientId);
            } else {
                next.add(ingredientId);
            }
            return next;
        });
    };

    const toggleAll = () => {
        if (selectedIngredients.size === recipeData.ingredients.length) {
            // Deselect all
            setSelectedIngredients(new Set());
        } else {
            // Select all
            setSelectedIngredients(new Set(recipeData.ingredients.map((i: { id: any; }) => i.id)));
        }
    };

    const isAllSelected = recipeData && selectedIngredients.size === recipeData.ingredients.length && recipeData.ingredients.length > 0;

    // Save Logic
    const isSaved = recipeData && savedRecipes.some(r => r.recipeId === recipeData.id);

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

    const handleSaveToggle = async () => {
        if (!userId) return; // Must be logged in

        try {
            if (isSaved) {
                // Optimistic UI updates
                removeSavedRecipe(recipeData.id);
                await deleteSavedRecipeService(userId, recipeData.id);
            } else {
                // Optimistic UI updates
                addSavedRecipe({ recipeId: recipeData.id, ...recipeData });
                await saveRecipeService(userId, recipeData);
            }
        } catch (error) {
            console.error("Error toggling saved state:", error);
            // In a real app we'd revert the optimistic state change here on error
        }
    };

    if (loading || !recipeData) {
        return <RecipeDetailsSkeleton />;
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-[#051109] text-white pb-24 relative overflow-x-hidden"
        >
            {/* Hero Section */}
            <div className="relative h-[55vh] min-h-[450px] w-full">
                {/* Background Image with Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${recipeData.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051109] via-[#051109]/40 to-[#051109]/20" />

                {/* Top Nav Buttons */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors"
                    >
                        <ChevronLeft className="w-7 h-7 text-white" />
                    </button>
                    <div className="flex gap-4">
                        <button
                            className={`w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center border transition-colors group ${isSaved
                                    ? 'bg-[#00ff84]/20 border-[#00ff84]/50'
                                    : 'bg-black/40 border-white/10 hover:bg-[#00ff84]/20'
                                }`}
                            onClick={handleSaveToggle}
                        >
                            <Heart
                                className={`w-7 h-7 transition-colors ${isSaved
                                        ? 'fill-[#00ff84] text-[#00ff84]'
                                        : 'text-white group-hover:text-[#00ff84]'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-12 left-0 right-0 p-8">
                    <div className="max-w-5xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00ff84]/20 text-[#00ff84] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#00ff84]/30 backdrop-blur-md">
                            <Activity className="w-3 h-3" />
                            Perfect Match
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
                            {recipeData.title}
                        </h1>
                        <p className="text-gray-200 text-sm md:text-lg max-w-3xl leading-relaxed opacity-90">
                            {recipeData.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="max-w-5xl mx-auto px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Clock, label: recipeData.time, sub: "COOK TIME" },
                        { icon: Activity, label: recipeData.healthMatch, sub: "HEALTH MATCH" },
                        { icon: Flame, label: recipeData.calories, sub: "CALORIES" },
                        { icon: Beef, label: recipeData.protein, sub: "PROTEIN" }
                    ].map((stat: any, idx: number) => (
                        <div key={idx} className="bg-[#0d2114]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-lg">
                            <stat.icon className="w-6 h-6 text-[#00ff84] mb-3" />
                            <span className="font-bold text-xl leading-tight">{stat.label}</span>
                            <span className="text-[10px] text-gray-500 font-bold tracking-wider mt-1">{stat.sub}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Health Insight & Detailed Nutrition */}
            {recipeData.nutrition && (
                <div className="max-w-5xl mx-auto px-8 mt-12">
                    <div className="bg-gradient-to-r from-[#0d2114] to-[#051a10] border border-[#00ff84]/20 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-start gap-5 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#00ff84]/20 flex items-center justify-center shrink-0 border border-[#00ff84]/30">
                                <Activity className="w-6 h-6 text-[#00ff84]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">AI Health Insight</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {recipeData.healthInsight || "This recipe provides a balanced nutritional profile based on its ingredients."}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {[
                                { label: "Calories", value: `${recipeData.nutrition.calories} kcal` },
                                { label: "Protein", value: `${recipeData.nutrition.protein}g` },
                                { label: "Carbs", value: `${recipeData.nutrition.carbs}g` },
                                { label: "Fat", value: `${recipeData.nutrition.fat}g` },
                                { label: "Fiber", value: `${recipeData.nutrition.fiber}g` },
                                { label: "Sugar", value: `${recipeData.nutrition.sugar}g` },
                            ].map((n, i) => (
                                <div key={i} className="bg-black/20 rounded-2xl p-4 text-center border border-white/5 backdrop-blur-md hover:border-[#00ff84]/30 transition-colors">
                                    <div className="text-xl font-bold text-white">{n.value}</div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{n.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Layout */}
            <div className="max-w-5xl mx-auto px-8 mt-16 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20">

                    {/* Left Column: Ingredients */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                Ingredients
                                <span className="text-sm font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                                    {recipeData.ingredients.length}
                                </span>
                            </h2>
                            <button
                                onClick={toggleAll}
                                className="text-xs font-bold text-[#00ff84] uppercase tracking-wider hover:text-[#00ff84]/80 transition-colors"
                            >
                                {isAllSelected ? 'Deselect All' : 'Select All'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {recipeData.ingredients.map((item: any) => {
                                const isChecked = selectedIngredients.has(item.id);
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleIngredient(item.id)}
                                        className={`group flex items-center justify-between p-5 rounded-3xl border transition-all cursor-pointer select-none
                                            ${isChecked
                                                ? 'bg-[#00ff84]/10 border-[#00ff84]/30 text-[#00ff84]'
                                                : 'bg-[#0d2114] border-white/5 hover:border-white/10 hover:bg-[#0d2114]/80'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                                                ${isChecked
                                                    ? 'bg-[#00ff84] border-[#00ff84] shadow-[0_0_15px_rgba(0,255,132,0.4)]'
                                                    : 'border-gray-600 group-hover:border-[#00ff84]/50'}`}
                                            >
                                                {isChecked && <CheckCircle2 className="w-4 h-4 text-[#051109]" />}
                                            </div>
                                            <span className={`text-sm font-semibold transition-colors ${isChecked ? 'text-[#00ff84]' : 'text-gray-300'}`}>
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${isChecked ? 'bg-[#00ff84]/20 text-[#00ff84]' : 'bg-white/5 text-gray-500'}`}>
                                            {item.amount}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Chef's Tip */}
                        {recipeData.chefTip && (
                            <div className="mt-12 bg-[#00ff84]/5 border border-[#00ff84]/20 rounded-[40px] p-8 flex gap-6 shadow-2xl">
                                <div className="w-12 h-12 rounded-2xl bg-[#00ff84] shrink-0 flex items-center justify-center">
                                    <InfoIcon className="w-6 h-6 text-[#051109]" />
                                </div>
                                <div>
                                    <h4 className="text-[#00ff84] text-xl font-bold mb-3">Chef's Health Tip</h4>
                                    <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                                        {recipeData.chefTip}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Instructions */}
                    <div className="space-y-10">
                        <h2 className="text-3xl font-bold">Cooking Instructions</h2>

                        <div className="space-y-12 relative before:absolute before:inset-0 before:left-[19px] before:w-0.5 before:bg-white/5 before:h-full">
                            {recipeData.instructions.map((step: any, idx: number) => (
                                <div key={idx} className="relative flex items-start gap-8 group">
                                    <div className="relative z-10 w-10 h-10 rounded-full bg-[#0d2114] border border-[#00ff84]/30 flex items-center justify-center shrink-0 font-bold text-lg text-[#00ff84] shadow-[0_0_20px_rgba(0,255,132,0.15)] group-hover:scale-110 transition-transform">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 pt-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-[#00ff84]/60" />
                                            <span className="text-[11px] font-black text-[#00ff84] tracking-[0.2em] uppercase">
                                                {step.time}
                                            </span>
                                        </div>
                                        <p className="text-lg text-gray-300 leading-relaxed font-medium">
                                            {step.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info Cards */}
                        <div className="pt-10 grid grid-cols-1 gap-4">
                            {/* Complexity Card */}
                            <div className="relative">
                                <div
                                    onClick={() => setActivePicker(activePicker === 'complexity' ? null : 'complexity')}
                                    className={`w-full flex items-center justify-between p-6 bg-[#0d2114] border rounded-3xl transition-all group cursor-pointer
                                        ${activePicker === 'complexity' ? 'border-[#00ff84]/50 bg-[#0d2114]/80' : 'border-white/5 hover:bg-white/5'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                                            ${activePicker === 'complexity' ? 'bg-[#00ff84]/20' : 'bg-black/40 group-hover:bg-[#00ff84]/10'}`}
                                        >
                                            <Activity className="w-6 h-6 text-[#00ff84]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Complexity</p>
                                            <p className="text-lg font-bold text-gray-200">{currentComplexity}</p>
                                        </div>
                                    </div>
                                    <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activePicker === 'complexity' ? 'rotate-90 text-[#00ff84]' : 'rotate-180'}`} />
                                </div>

                                {/* Complexity Options */}
                                {activePicker === 'complexity' && (
                                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0d2114]/95 backdrop-blur-xl border border-[#00ff84]/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                        {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                                            <button
                                                key={lvl}
                                                onClick={() => {
                                                    setCurrentComplexity(lvl as any);
                                                    setActivePicker(null);
                                                }}
                                                className={`w-full px-6 py-4 text-left text-sm font-bold transition-colors border-b border-white/5 last:border-0
                                                    ${currentComplexity === lvl ? 'text-[#00ff84] bg-[#00ff84]/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                                `}
                                            >
                                                {lvl}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dietary Card */}
                            <div className="relative">
                                <div
                                    onClick={() => setActivePicker(activePicker === 'dietary' ? null : 'dietary')}
                                    className={`w-full flex items-center justify-between p-6 bg-[#0d2114] border rounded-3xl transition-all group cursor-pointer
                                        ${activePicker === 'dietary' ? 'border-[#00ff84]/50 bg-[#0d2114]/80' : 'border-white/5 hover:bg-white/5'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                                            ${activePicker === 'dietary' ? 'bg-[#00ff84]/20' : 'bg-black/40 group-hover:bg-[#00ff84]/10'}`}
                                        >
                                            <Heart className="w-6 h-6 text-[#00ff84]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Dietary</p>
                                            <p className="text-lg font-bold text-gray-200">{currentDietary}</p>
                                        </div>
                                    </div>
                                    <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activePicker === 'dietary' ? 'rotate-90 text-[#00ff84]' : 'rotate-180'}`} />
                                </div>

                                {/* Dietary Options */}
                                {activePicker === 'dietary' && (
                                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0d2114]/95 backdrop-blur-xl border border-[#00ff84]/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                        {['Omnivore', 'Vegetarian', 'Vegan'].map((diet) => (
                                            <button
                                                key={diet}
                                                onClick={() => {
                                                    setCurrentDietary(diet);
                                                    setActivePicker(null);
                                                }}
                                                className={`w-full px-6 py-4 text-left text-sm font-bold transition-colors border-b border-white/5 last:border-0
                                                    ${currentDietary === diet ? 'text-[#00ff84] bg-[#00ff84]/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                                `}
                                            >
                                                {diet}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Fixed Bottom Button Backdrop */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#051109] via-[#051109]/95 to-transparent z-40" />

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6">
                <button
                    onClick={() => navigate(`/cooking-guide/${recipeData.id}`)}
                    className="bg-[#00ff84] hover:bg-[#00ff84]/90 text-[#051109] font-black uppercase tracking-[0.1em] py-5 px-16 rounded-full w-full max-w-lg flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(0,255,132,0.3)] transition-all hover:scale-[1.03] active:scale-[0.98] group">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#051109] border-b-[8px] border-b-transparent group-hover:translate-x-1 transition-transform"></div>
                    Start Cooking
                </button>
            </div>
        </motion.div>
    );
};

export default RecipeDetails;