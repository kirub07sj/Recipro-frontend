import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthProfileStore } from '../../store/healthProfileStore';
import { useAuth } from '../../hooks/useAuth';

const HealthProfile = () => {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const { createProfile, isLoading } = useHealthProfileStore();

    const [weight, setWeight] = useState(72);
    const [dietMode, setDietMode] = useState('');
    const [allergies, setAllergies] = useState<string[]>([]);
    const [conditions, setConditions] = useState<string[]>([]);

    const toggleArray = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (arr.includes(item)) {
            setArr(arr.filter(i => i !== item));
        } else {
            setArr([...arr, item]);
        }
    };

    const handleSave = async () => {
        if (!userId) return;
        try {
            await createProfile({
                user: userId,
                weight,
                dietMode,
                allergies,
                dislikes: [], // Dislikes can be managed later from the full profile page
                conditions,
                healthScore: 85, // Default base score
                dailyGoal: 2200 // Default base goal
            });
            // Profile setup complete, navigate to dashboard or profile
            navigate('/profile');
        } catch (err) {
            console.error("Failed to create profile:", err);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00ff88]/30" style={{ background: 'rgb(5, 22, 11)' }}>
                <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md px-6 py-4 flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-6 h-6 text-[#00ff88]" aria-hidden="true">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Health Profile</h1>
                        <p className="text-xs text-zinc-400">Personalize your AI recipe experience</p>
                    </div>
                </header>
                <main className="px-6 pt-4 pb-32 max-w-2xl mx-auto space-y-10">
                    <section className="space-y-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Set Up Your Health Profile</h2>
                        <p className="text-sm text-zinc-400 leading-relaxed">We use this data to calculate your macros and filter recipes that match your lifestyle perfectly.</p>
                    </section>
                    
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-[#00ff88]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scale w-5 h-5" aria-hidden="true">
                                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                                <path d="M7 21h10"></path>
                                <path d="M12 3v18"></path>
                                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
                            </svg>
                            <h3 className="font-semibold uppercase tracking-wider text-xs">Body Metrics</h3>
                        </div>
                        <div className="bg-[#111111] p-6 rounded-3xl border border-white/5 shadow-xl">
                            <label className="block text-sm text-zinc-400 mb-3">Current Weight (kg)</label>
                            <div className="relative flex items-center">
                                <input 
                                    className="w-full bg-[#1a1a1a] border-none text-white text-3xl font-bold p-5 rounded-2xl focus:ring-2 focus:ring-[#00ff88]/50 transition-all outline-none" 
                                    placeholder="70" 
                                    type="number" 
                                    value={weight}
                                    onChange={(e) => setWeight(Number(e.target.value))} 
                                />
                                <span className="absolute right-6 text-zinc-500 font-medium">kg</span>
                            </div>
                        </div>
                    </section>
                    
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-[#00ff88]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf w-5 h-5" aria-hidden="true">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                            </svg>
                            <h3 className="font-semibold uppercase tracking-wider text-xs">Dietary Preferences</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Vegetarian', 'Vegan', 'Low Carb', 'High Protein', 'Keto', 'Paleo'].map(diet => (
                                <button 
                                    key={diet}
                                    onClick={() => setDietMode(diet)}
                                    className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${dietMode === diet ? 'bg-green-500/20 text-[#00ff88] border-[#00ff88]' : 'bg-[#111111] text-zinc-400 border-white/5 hover:border-white/20'}`}
                                >
                                    {diet}
                                </button>
                            ))}
                        </div>
                    </section>
                    
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-[#00ff88]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert w-5 h-5" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" x2="12" y1="8" y2="12"></line>
                                <line x1="12" x2="12.01" y1="16" y2="16"></line>
                            </svg>
                            <h3 className="font-semibold uppercase tracking-wider text-xs">Allergies &amp; Intolerances</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {['Nuts', 'Dairy', 'Gluten', 'Eggs', 'Seafood', 'Soy'].map(allergy => (
                                <button 
                                    key={allergy}
                                    onClick={() => toggleArray(allergies, setAllergies, allergy)}
                                    className={`p-4 rounded-2xl text-sm font-medium transition-all duration-200 border flex flex-col items-center justify-center gap-2 text-center ${allergies.includes(allergy) ? 'bg-green-500/10 text-[#00ff88] border-[#00ff88]' : 'bg-[#111111] text-zinc-400 border-white/5 hover:bg-[#1a1a1a]'}`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${allergies.includes(allergy) ? 'bg-[#00ff88]' : 'bg-zinc-700'}`}></div>
                                    {allergy}
                                </button>
                            ))}
                        </div>
                    </section>
                    
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-[#00ff88]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope w-5 h-5" aria-hidden="true">
                                <path d="M11 2v2"></path>
                                <path d="M5 2v2"></path>
                                <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
                                <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
                                <circle cx="20" cy="10" r="2"></circle>
                            </svg>
                            <h3 className="font-semibold uppercase tracking-wider text-xs">Medical Conditions</h3>
                        </div>
                        <div className="space-y-3">
                            {['Diabetes', 'Hypertension', 'Heart Condition', 'None'].map(condition => (
                                <button 
                                    key={condition}
                                    onClick={() => {
                                        if (condition === 'None') setConditions(['None']);
                                        else {
                                            const newConds = conditions.filter(c => c !== 'None');
                                            toggleArray(newConds, setConditions, condition);
                                        }
                                    }}
                                    className={`w-full p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${conditions.includes(condition) ? 'bg-green-500/10 border-[#00ff88] text-white' : 'bg-[#111111] border-white/5 text-zinc-400 hover:border-white/20'}`}
                                >
                                    <span className="font-medium">{condition}</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${conditions.includes(condition) ? 'border-[#00ff88] bg-[#00ff88]/20' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
                                        {conditions.includes(condition) && <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]"></div>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                    
                    <div className="bg-[#00ff88] p-5 rounded-3xl text-black flex items-start gap-4 shadow-[0_10px_30px_rgba(0,255,136,0.15)]">
                        <div className="bg-black/10 p-2 rounded-xl mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info w-5 h-5" aria-hidden="true">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-tight">AI Nutrition Insight</h4>
                            <p className="text-sm font-medium leading-snug mt-1 opacity-80">Profiles with accurate weight and dietary markers get 42% more accurate macro-tracking recommendations.</p>
                        </div>
                    </div>
                </main>
                
                <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-50" style={{ background: 'rgba(5, 22, 11, 0.2)' }}>
                    <div className="max-w-2xl mx-auto">
                        <button 
                            onClick={handleSave}
                            disabled={isLoading}
                            className={`w-full bg-[#00ff88] text-black font-bold py-5 rounded-2xl shadow-[0_15px_30px_rgba(0,255,136,0.2)] flex items-center justify-center gap-2 text-lg active:brightness-90 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Saving...' : 'Save & Continue'}
                            {!isLoading && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-5 h-5" aria-hidden="true">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HealthProfile;