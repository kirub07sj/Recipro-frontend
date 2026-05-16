import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthProfileStore } from '../../store/healthProfileStore';
import { useAuth } from '../../hooks/useAuth';
import { calculateEstimatedCalories, type Gender, type ActivityLevel, type FitnessGoal } from '../../utils/calorieCalculator';
import { cuisines } from '../../data/cuisine';

const HealthProfile = () => {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const { profile, createProfile, updateProfile, isLoading } = useHealthProfileStore();

    const [weight, setWeight] = useState<number | ''>(profile?.weight || '');
    const [height, setHeight] = useState<number | ''>(profile?.height || '');
    const [cuisine, setCuisine] = useState(profile?.cuisine || 'Ethiopian');
    const [age, setAge] = useState<number | ''>(profile?.age || '');
    const [gender, setGender] = useState<Gender>((profile?.gender as Gender) || 'male');
    const [activityLevel, setActivityLevel] = useState<ActivityLevel>((profile?.activityLevel as ActivityLevel) || 'sedentary');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>((profile?.fitnessGoal as FitnessGoal) || 'maintain');
    const [useCustomGoal, setUseCustomGoal] = useState(false);
    const [dailyGoal, setDailyGoal] = useState<number | ''>(profile?.dailyGoal || '');
    const [dietMode, setDietMode] = useState(profile?.dietMode || '');
    const [allergies, setAllergies] = useState<string[]>(profile?.allergies || []);
    const [conditions, setConditions] = useState<string[]>(profile?.conditions || []);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        if (!useCustomGoal) {
            const w = Number(weight) || 72;
            const h = Number(height) || 170;
            const a = Number(age) || 30;
            const calculated = calculateEstimatedCalories(w, h, a, gender, activityLevel, fitnessGoal);
            setDailyGoal(calculated);
        }
    }, [weight, height, age, gender, activityLevel, fitnessGoal, useCustomGoal]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        const w = Number(weight);
        const h = Number(height);
        const a = Number(age);
        const d = Number(dailyGoal);

        if (!w || w < 20 || w > 500) newErrors.weight = "Weight must be between 20kg and 500kg";
        if (!h || h < 50 || h > 300) newErrors.height = "Height must be between 50cm and 300cm";
        if (!a || a < 1 || a > 120) newErrors.age = "Age must be between 1 and 120";
        if (!d || d < 500 || d > 8000) newErrors.dailyGoal = "Goal must be between 500 and 8000 kcal";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (profile) {
            setWeight(profile.weight || 72);
            setHeight(profile.height || 170);
            setAge(profile.age || 30);
            setGender((profile.gender as Gender) || 'male');
            setActivityLevel((profile.activityLevel as ActivityLevel) || 'sedentary');
            setFitnessGoal((profile.fitnessGoal as FitnessGoal) || 'maintain');
            setCuisine(profile.cuisine || 'Ethiopian');
            setDailyGoal(profile.dailyGoal || 2200);
            setDietMode(profile.dietMode || '');
            setAllergies(profile.allergies || []);
            setConditions(profile.conditions || []);
        }
    }, [profile]);

    const toggleArray = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (arr.includes(item)) {
            setArr(arr.filter(i => i !== item));
        } else {
            setArr([...arr, item]);
        }
    };

    const handleSave = async () => {
        if (!userId) return;
        if (!validate()) return;
        try {
            if (profile) {
                await updateProfile(userId, {
                    weight: Number(weight),
                    height: Number(height),
                    age: Number(age),
                    gender,
                    activityLevel,
                    fitnessGoal,
                    cuisine,
                    dailyGoal: Number(dailyGoal),
                    dietMode,
                    allergies,
                    conditions,
                });
            } else {
                await createProfile({
                    user: userId,
                    weight: Number(weight),
                    height: Number(height),
                    age: Number(age),
                    gender,
                    activityLevel,
                    fitnessGoal,
                    cuisine,
                    dailyGoal: Number(dailyGoal),
                    dietMode,
                    allergies,
                    dislikes: [],
                    conditions,
                    healthScore: 85,
                });
            }
            navigate('/profile');
        } catch (err: any) {
            console.error("Failed to save profile:", err);
            setErrors({ submit: err.message || "Failed to save profile. Please check your inputs." });
        }
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (validate()) setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    }; return (
        <div>
            <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00ff88]/30" style={{ background: 'rgb(5, 22, 11)' }}>
                <header className="sticky top-0 z-30 bg-[#050505]/30 backdrop-blur-md px-6 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-6 h-6 text-[#00ff88]" aria-hidden="true">
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Health Profile</h1>
                            <p className="text-xs text-zinc-400">Step {currentStep} of 3</p>
                        </div>
                    </div>

                    {/* Step Indicator Dots */}
                    <div className="flex gap-3">
                        {[1, 2, 3].map((s) => (
                            <button
                                key={s}
                                onClick={() => {
                                    if (s < currentStep || validate()) setCurrentStep(s);
                                }}
                                className={`w-5 h-10 rounded-full scale-[.4] transition-all duration-500 ${currentStep === s ? 'bg-[#00ff88] shadow-[0_0_15px_#00ff88]' : 'bg-zinc-700 hover:bg-zinc-500'}`}
                            />
                        ))}
                    </div>
                </header>
                <main className="px-6 pt-4 pb-10 max-w-4xl mx-auto space-y-10 scale-90 -mt-5">
                    {currentStep === 1 && (
                        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Body Metrics</h2>
                                <p className="text-sm text-zinc-400">We use these to calculate your metabolic rate and calorie needs.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl">
                                    <label className="block text-sm text-zinc-400 mb-3">Weight (kg)</label>
                                    <div className="relative flex items-center">
                                        <input
                                            className={`w-full bg-[#0d2214] border-none text-white text-3xl font-bold p-5 rounded-2xl focus:ring-2 ${errors.weight ? 'focus:ring-red-500/50' : 'focus:ring-[#00ff88]/50'} transition-all outline-none`}
                                            placeholder="70"
                                            type="text"
                                            inputMode="numeric"
                                            value={weight}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setWeight(val ? Number(val) : '');
                                                if (errors.weight) setErrors(prev => ({ ...prev, weight: '' }));
                                            }}
                                        />
                                        <span className="absolute right-6 text-zinc-500 font-medium">kg</span>
                                    </div>
                                    {errors.weight && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.weight}</p>}
                                </div>
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl">
                                    <label className="block text-sm text-zinc-400 mb-3">Height (cm)</label>
                                    <div className="relative flex items-center">
                                        <input
                                            className={`w-full bg-[#0d2214] border-none text-white text-3xl font-bold p-5 rounded-2xl focus:ring-2 ${errors.height ? 'focus:ring-red-500/50' : 'focus:ring-[#00ff88]/50'} transition-all outline-none`}
                                            placeholder="170"
                                            type="text"
                                            inputMode="numeric"
                                            value={height}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setHeight(val ? Number(val) : '');
                                                if (errors.height) setErrors(prev => ({ ...prev, height: '' }));
                                            }}
                                        />
                                        <span className="absolute right-6 text-zinc-500 font-medium">cm</span>
                                    </div>
                                    {errors.height && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.height}</p>}
                                </div>
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl">
                                    <label className="block text-sm text-zinc-400 mb-3">Age</label>
                                    <div className="relative flex items-center">
                                        <input
                                            className={`w-full bg-[#0d2214] border-none text-white text-3xl font-bold p-5 rounded-2xl focus:ring-2 ${errors.age ? 'focus:ring-red-500/50' : 'focus:ring-[#00ff88]/50'} transition-all outline-none`}
                                            placeholder="30"
                                            type="text"
                                            inputMode="numeric"
                                            value={age}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setAge(val ? Number(val) : '');
                                                if (errors.age) setErrors(prev => ({ ...prev, age: '' }));
                                            }}
                                        />
                                        <span className="absolute right-6 text-zinc-500 font-medium">yrs</span>
                                    </div>
                                    {errors.age && <p className="text-red-500 text-xs mt-2 ml-2 font-medium">{errors.age}</p>}
                                </div>
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl">
                                    <label className="block text-sm text-zinc-400 mb-3">Gender</label>
                                    <div className="flex gap-2">
                                        {['male', 'female'].map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => setGender(g as Gender)}
                                                className={`flex-1 p-4 rounded-2xl text-sm font-bold capitalize transition-all border ${gender === g ? 'bg-green-500/20 text-[#00ff88] border-[#00ff88]' : 'bg-[#0d2214] text-zinc-400 border-white/5 hover:border-white/20'}`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl lg:col-span-2">
                                    <label className="block text-sm text-zinc-400 mb-3">Activity Level</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {[
                                            { id: 'sedentary', label: 'Sedentary' },
                                            { id: 'light', label: 'Lightly Active' },
                                            { id: 'moderate', label: 'Moderately Active' },
                                            { id: 'active', label: 'Very Active' }
                                        ].map((act) => (
                                            <button
                                                key={act.id}
                                                onClick={() => setActivityLevel(act.id as ActivityLevel)}
                                                className={`p-3 rounded-xl text-xs font-semibold transition-all border ${activityLevel === act.id ? 'bg-green-500/20 text-[#00ff88] border-[#00ff88]' : 'bg-[#0d2214] text-zinc-400 border-white/5 hover:border-white/20'}`}
                                            >
                                                {act.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl lg:col-span-1">
                                    <label className="block text-sm text-zinc-400 mb-3">Fitness Goal</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'lose_weight', label: 'Lose Weight' },
                                            { id: 'maintain', label: 'Maintain' },
                                            { id: 'gain_weight', label: 'Gain Weight' }
                                        ].map((fg) => (
                                            <button
                                                key={fg.id}
                                                onClick={() => setFitnessGoal(fg.id as FitnessGoal)}
                                                className={`p-3 rounded-xl text-xs font-semibold transition-all border ${fitnessGoal === fg.id ? 'bg-green-500/20 text-[#00ff88] border-[#00ff88]' : 'bg-[#0d2214] text-zinc-400 border-white/5 hover:border-white/20'}`}
                                            >
                                                {fg.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl lg:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm text-zinc-400 mb-1">Estimated Daily Calories</label>
                                        <p className="text-xs text-zinc-500 mb-3">Target calculated based on your metrics.</p>
                                        <label className="flex items-center gap-2 cursor-pointer w-fit">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-zinc-700 text-[#00ff88] focus:ring-[#00ff88] bg-[#0d2214] cursor-pointer"
                                                checked={useCustomGoal}
                                                onChange={(e) => setUseCustomGoal(e.target.checked)}
                                            />
                                            <span className="text-sm font-medium text-zinc-300">Custom Goal</span>
                                        </label>
                                    </div>
                                    <div className="relative flex items-center sm:w-1/3">
                                        <input
                                            className={`w-full bg-[#0d2214] border-none text-[#00ff88] text-3xl font-bold p-5 rounded-2xl focus:ring-2 ${errors.dailyGoal ? 'focus:ring-red-500/50' : 'focus:ring-[#00ff88]/50'} transition-all outline-none ${!useCustomGoal && 'opacity-70'}`}
                                            placeholder="2200"
                                            type="text"
                                            inputMode="numeric"
                                            value={dailyGoal}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setDailyGoal(val ? Number(val) : '');
                                                if (errors.dailyGoal) setErrors(prev => ({ ...prev, dailyGoal: '' }));
                                            }}
                                            disabled={!useCustomGoal}
                                        />
                                        <span className="absolute right-6 text-zinc-500 font-medium">kcal</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {currentStep === 2 && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Preferences</h2>
                                <p className="text-sm text-zinc-400">Tell us what you like and what you need to avoid.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#00ff88]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
                                        <h3 className="font-semibold uppercase tracking-wider text-xs">Cuisine</h3>
                                    </div>
                                    <div className="bg-[#08150c] p-6 rounded-3xl border border-white/5 shadow-xl">
                                        <select
                                            className="w-full bg-[#0d2214] border-none text-white text-2xl font-bold p-5 rounded-2xl focus:ring-2 focus:ring-[#00ff88]/50 transition-all outline-none appearance-none cursor-pointer"
                                            value={cuisine}
                                            onChange={(e) => setCuisine(e.target.value)}
                                        >
                                            <option value="" disabled>Select a cuisine</option>
                                            {cuisines.map(c => (
                                                <option key={c} value={c} className="bg-[#0d2214] text-lg">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#00ff88]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                                        <h3 className="font-semibold uppercase tracking-wider text-xs">Diet Type</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Vegetarian', 'Vegan', 'Low Carb', 'High Protein'].map(diet => (
                                            <button
                                                key={diet}
                                                onClick={() => setDietMode(diet)}
                                                className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${dietMode === diet ? 'bg-green-500/20 text-[#00ff88] border-[#00ff88]' : 'bg-[#08150c] text-zinc-400 border-white/5 hover:border-white/20'}`}
                                            >
                                                {diet}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#00ff88]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                    <h3 className="font-semibold uppercase tracking-wider text-xs">Allergies</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                                    {['Nuts', 'Dairy', 'Gluten', 'Eggs', 'Seafood', 'Soy'].map(allergy => (
                                        <button
                                            key={allergy}
                                            onClick={() => toggleArray(allergies, setAllergies, allergy)}
                                            className={`p-4 rounded-2xl text-sm font-medium transition-all border flex flex-col items-center gap-2 ${allergies.includes(allergy) ? 'bg-green-500/10 text-[#00ff88] border-[#00ff88]' : 'bg-[#08150c] text-zinc-400 border-white/5 hover:bg-[#0d2214]'}`}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${allergies.includes(allergy) ? 'bg-[#00ff88]' : 'bg-zinc-700'}`}></div>
                                            {allergy}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {currentStep === 3 && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Health Status</h2>
                                <p className="text-sm text-zinc-400">Final check for any medical conditions we should consider.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        className={`w-full p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group ${conditions.includes(condition) ? 'bg-green-500/10 border-[#00ff88] text-white' : 'bg-[#08150c] border-white/5 text-zinc-400 hover:border-white/20'}`}
                                    >
                                        <span className="text-lg font-medium">{condition}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${conditions.includes(condition) ? 'border-[#00ff88] bg-[#00ff88]/20' : 'border-zinc-700 group-hover:border-zinc-500'}`}>
                                            {conditions.includes(condition) && <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]"></div>}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="bg-[#00ff88] p-6 rounded-[2rem] text-black flex items-start gap-4 shadow-2xl">
                                <div className="bg-black/10 p-3 rounded-2xl mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg uppercase tracking-tight">Ready to launch!</h4>
                                    <p className="text-sm font-medium leading-snug mt-1 opacity-90">Your profile is tuned. We'll prioritize recipes that keep you on track with your {fitnessGoal.replace('_', ' ')} goal.</p>
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-50">
                    <div className="max-w-4xl h-16 mx-auto flex gap-4">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="flex-1 bg-zinc-800 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 text-lg hover:bg-zinc-700 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                Back
                            </button>
                        )}
                        <button
                            onClick={currentStep === 3 ? handleSave : nextStep}
                            disabled={isLoading}
                            className={`flex-[2] bg-[#00ff88] text-black font-bold py-5 rounded-2xl shadow-[0_15px_30px_rgba(0,255,136,0.2)] flex items-center justify-center gap-2 text-lg active:brightness-90 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Saving...' : (currentStep === 3 ? 'Save & Finish' : 'Next Step')}
                            {!isLoading && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-5 h-5" aria-hidden="true">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.submit && <p className="max-w-4xl mx-auto text-red-500 text-sm mt-4 text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20">{errors.submit}</p>}
                </footer>
            </div>
        </div>
    );
};

export default HealthProfile;