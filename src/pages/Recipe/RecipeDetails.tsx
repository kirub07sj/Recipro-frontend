import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { 
  ChevronLeft, Share2, Heart, Clock, Activity, 
  Flame, Beef, InfoIcon, CheckCircle2 
} from 'lucide-react';

import { MOCK_RECIPES } from '../Dashboard/Dashboard';

const RecipeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Find the recipe or default to the first one
    const recipeData = MOCK_RECIPES.find(r => r.id.toString() === id) || MOCK_RECIPES[0];

    // State for selected ingredients
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());

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
            setSelectedIngredients(new Set(recipeData.ingredients.map(i => i.id)));
        }
    };

    const isAllSelected = selectedIngredients.size === recipeData.ingredients.length && recipeData.ingredients.length > 0;

    return (
        <div className="min-h-screen bg-[#051109] text-white pb-24 relative overflow-x-hidden">
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
                        className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="flex gap-3">
                        <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors">
                            <Share2 className="w-5 h-5 text-white" />
                        </button>
                        <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-[#00ff84]/20 transition-colors group">
                            <Heart className="w-5 h-5 group-hover:text-[#00ff84] transition-colors" />
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
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-[#0d2114]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-lg">
                            <stat.icon className="w-6 h-6 text-[#00ff84] mb-3" />
                            <span className="font-bold text-xl leading-tight">{stat.label}</span>
                            <span className="text-[10px] text-gray-500 font-bold tracking-wider mt-1">{stat.sub}</span>
                        </div>
                    ))}
                </div>
            </div>

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
                            {recipeData.ingredients.map((item) => {
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
                            {recipeData.instructions.map((step, idx) => (
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
                            <div className="w-full flex items-center justify-between p-6 bg-[#0d2114] border border-white/5 rounded-3xl hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center group-hover:bg-[#00ff84]/10 transition-colors">
                                        <Activity className="w-6 h-6 text-[#00ff84]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Complexity</p>
                                        <p className="text-lg font-bold text-gray-200">{recipeData.difficulty}</p>
                                    </div>
                                </div>
                                <ChevronLeft className="w-5 h-5 text-gray-500 rotate-180" />
                            </div>
                            <div className="w-full flex items-center justify-between p-6 bg-[#0d2114] border border-white/5 rounded-3xl hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center group-hover:bg-[#00ff84]/10 transition-colors">
                                        <Heart className="w-6 h-6 text-[#00ff84]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Dietary</p>
                                        <p className="text-lg font-bold text-gray-200">{recipeData.dietary}</p>
                                    </div>
                                </div>
                                <ChevronLeft className="w-5 h-5 text-gray-500 rotate-180" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Fixed Bottom Button Backdrop */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#051109] via-[#051109]/95 to-transparent z-40" />
            
            {/* Fixed Bottom Button */}
            <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6">
                <button className="bg-[#00ff84] hover:bg-[#00ff84]/90 text-[#051109] font-black uppercase tracking-[0.1em] py-5 px-16 rounded-full w-full max-w-lg flex items-center justify-center gap-4 shadow-[0_0_50px_rgba(0,255,132,0.3)] transition-all hover:scale-[1.03] active:scale-[0.98] group">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#051109] border-b-[8px] border-b-transparent group-hover:translate-x-1 transition-transform"></div>
                    Start Cooking
                </button>
            </div>
        </div>
    );
};

export default RecipeDetails;