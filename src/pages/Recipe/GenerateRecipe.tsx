import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenerateRecipe = () => {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([
        'Chicken Breast', 'Lemon', 'Avocado', 'Cherry Tomatoes', 'Olive Oil', 'Garlic', 'Fresh Basil', 'Parmesan'
    ]);
    const [inputValue, setInputValue] = useState('');

    const suggestions = ['Onion', 'Spinach', 'Feta Cheese', 'Bell Pepper', 'Cucumber', 'Greek Yogurt'];

    const removeIngredient = (ing: string) => {
        setIngredients(ingredients.filter(i => i !== ing));
    };

    const addIngredient = (ing: string) => {
        if (ing && !ingredients.includes(ing)) {
            setIngredients([...ingredients, ing]);
        }
    };

    const handleAddClick = () => {
        if (inputValue.trim()) {
            addIngredient(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#051109] text-white p-6 md:p-10 font-sans relative pb-40">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <div>
                        <div className="flex items-center gap-1.5 text-[#00ff84] text-[10px] font-bold tracking-wider mb-1 uppercase">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                            Camera Scan
                        </div>
                        <h1 className="text-3xl font-bold">Generate Recipes</h1>
                    </div>
                </header>

                {/* Banner */}
                <div className="w-full h-56 rounded-[2rem] overflow-hidden relative border border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Vegetables"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#051109]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                        <div className="w-5 h-5 rounded-full bg-[#00ff84] flex items-center justify-center text-[#051109]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                        </div>
                        <span className="text-sm font-bold text-white">{ingredients.length} ingredients detected</span>
                    </div>
                    <div className="absolute bottom-4 right-4 text-[10px] font-bold tracking-widest text-white/60 uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                        Camera Snap
                    </div>
                </div>

                {/* Detected Ingredients */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Detected Ingredients</h2>
                        <button
                            onClick={() => setIngredients([])}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                            Reset
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {ingredients.map(ing => (
                            <div key={ing} className="bg-[#051a10] border border-[#00ff84]/30 text-[#00ff84] px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-semibold shadow-sm shadow-[#00ff84]/5">
                                {ing}
                                <button onClick={() => removeIngredient(ing)} className="hover:bg-[#00ff84]/20 rounded-full p-0.5 transition-colors text-[#00ff84]/70 hover:text-[#00ff84]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Input */}
                    <div className="flex items-center gap-3 pt-3">
                        <div className="flex-1 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddClick()}
                                placeholder="Add an ingredient..."
                                className="w-full bg-[#0d2114] border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white font-medium placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:border-[#00ff84]/50 transition-colors shadow-inner"
                            />
                        </div>
                        <button
                            onClick={handleAddClick}
                            disabled={!inputValue.trim()}
                            className="bg-[#0b3622] text-[#00ff84] font-bold px-8 py-4 rounded-2xl disabled:opacity-50 transition-all hover:bg-[#104b30] border border-[#00ff84]/20"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Suggested Additions */}
                <div className="space-y-4 pt-6">
                    <h3 className="text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase">Suggested Additions</h3>
                    <div className="flex flex-wrap gap-2.5">
                        {suggestions.map(sug => (
                            <button
                                key={sug}
                                onClick={() => addIngredient(sug)}
                                className="bg-[#0b1f13] border border-white/5 text-gray-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                {sug}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Generate Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#051109] via-[#051109]/90 to-transparent z-50 pointer-events-none">
                <div className="max-w-4xl mx-auto pointer-events-auto">
                    <button
                        onClick={() => navigate('/discovery')}
                        className="w-full bg-[#00ff84] text-[#051109] font-extrabold text-[1.1rem] py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00e676] active:scale-[0.98] transition-all shadow-[0_4px_30px_rgba(0,255,132,0.15)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.29 1.29L3 12l5.8 1.9a2 2 0 0 1 1.29 1.29L12 21l1.9-5.8a2 2 0 0 1 1.29-1.29L21 12l-5.8-1.9a2 2 0 0 1-1.29-1.29L12 3Z" /></svg>
                        Generate Recipes ({ingredients.length} ingredients)
                    </button>
                    <p className="text-center text-gray-500/80 text-[11px] mt-4 font-medium tracking-wide">
                        AI will suggest recipes based on your detected ingredients
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GenerateRecipe;