import { useHealthProfileStore } from '../../store/healthProfileStore';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const { profile, updateProfile } = useHealthProfileStore();
    const { userId } = useAuth();
    const userName = localStorage.getItem('userName') || 'Alex Doe';
    
    // Fallback values if profile is not fully populated yet
    const healthScore = profile?.healthScore || 85;
    const dailyGoal = profile?.dailyGoal || 2200;
    const dietMode = profile?.dietMode || 'Paleo';
    const allergies = profile?.allergies?.length ? profile.allergies : ['Peanuts', 'Shellfish'];
    const dislikes = profile?.dislikes?.length ? profile.dislikes : ['Cilantro', 'Olives'];
    
    const handleRemoveAllergy = async (item: string) => {
        if (!userId || !profile) return;
        const newAllergies = profile.allergies.filter((a: string) => a !== item);
        await updateProfile(userId, { allergies: newAllergies });
    };

    const handleRemoveDislike = async (item: string) => {
        if (!userId || !profile) return;
        const newDislikes = profile.dislikes.filter((d: string) => d !== item);
        await updateProfile(userId, { dislikes: newDislikes });
    };
    
    // Basic Add prompt for demo purposes
    const handleAddAllergy = async () => {
        if (!userId || !profile) return;
        const item = prompt("Add Allergy");
        if (item) {
            await updateProfile(userId, { allergies: [...profile.allergies, item] });
        }
    };

    const handleAddDislike = async () => {
        if (!userId || !profile) return;
        const item = prompt("Add Dislike");
        if (item) {
            await updateProfile(userId, { dislikes: [...profile.dislikes, item] });
        }
    };

    return (
        <div className="min-h-screen font-sans p-6" style={{ background: 'rgb(5, 22, 11)' }}>
            {/* Header / Avatar */}
            <div className="flex flex-col items-center mt-8">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#00ff88] to-green-300 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                        <img 
                            src="https://i.pravatar.cc/150?u=a04258114e29026702d" 
                            alt="Profile" 
                            className="w-full h-full object-cover rounded-full border-4 border-[#05160b]"
                        />
                    </div>
                    {/* The small 'x' or badge on the avatar shown in the image */}
                    <button className="absolute bottom-0 right-0 bg-[#00ff88] text-[#05160b] rounded-full p-1 shadow-lg hover:bg-green-400 transition-colors pointer-cursor border-2 border-[#05160b]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                <h1 className="text-2xl font-bold mt-4 text-white">{userName}</h1>
                <div className="flex items-center gap-1.5 mt-2 bg-[#05160b] border border-[#00ff88]/30 px-3 py-1 rounded-full shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#00ff88" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    <span className="text-[#00ff88] text-xs font-bold tracking-wide">Health Score: {healthScore}</span>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                {/* Health DNA */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                        <h2 className="text-xl font-bold">Health DNA</h2>
                    </div>
                    
                    <div className="flex gap-4">
                        {/* Daily Goal card */}
                        <div className="flex-1 bg-gradient-to-br from-[#0c2415] to-[#081a0f] border border-white/5 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            <h3 className="text-[10px] font-bold text-[#8ba494] uppercase tracking-widest mb-2">Daily Goal</h3>
                            <div className="flex items-end gap-1">
                                <span className="text-3xl font-extrabold">{dailyGoal.toLocaleString()}</span>
                                <span className="text-xs text-zinc-400 mb-1 font-medium">kcal</span>
                            </div>
                            <div className="mt-4 w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00ff88] w-[45%] rounded-full shadow-[0_0_10px_#00ff88]"></div>
                            </div>
                        </div>

                        {/* Diet Mode card */}
                        <div className="flex-1 bg-gradient-to-br from-[#0c2415] to-[#081a0f] border border-white/5 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            <h3 className="text-[10px] font-bold text-[#8ba494] uppercase tracking-widest mb-2">Diet Mode</h3>
                            <span className="text-2xl font-extrabold text-[#00ff88] filter drop-shadow-[0_0_5px_rgba(0,255,136,0.3)]">{dietMode || 'Select Diet'}</span>
                            <p className="text-xs text-zinc-400 mt-1 relative z-10 font-medium">Strict adherence</p>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -right-6 -bottom-6 text-white/[0.03] rotate-[-10deg]"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Preferences</h2>
                        <button className="text-[#00ff88] text-sm font-semibold hover:underline bg-transparent border-0 outline-none hover:text-green-400 transition-colors">Edit All</button>
                    </div>

                    <div className="space-y-6">
                        {/* Allergies */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Allergies</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {allergies.map((allergy: string) => (
                                    <span key={allergy} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/40 text-red-500 border border-red-500/20 text-sm font-bold shadow-sm">
                                        {allergy}
                                        <button onClick={() => handleRemoveAllergy(allergy)} className="hover:opacity-70 transition-opacity">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                        </button>
                                    </span>
                                ))}
                                <button onClick={handleAddAllergy} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#0a1c11] text-zinc-400 border border-white/5 hover:border-white/20 hover:bg-[#0c2415] text-sm font-medium transition-all shadow-sm">
                                    <span>+ Add</span>
                                </button>
                            </div>
                        </div>

                        {/* Dislikes */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]"></div>
                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Dislikes</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {dislikes.map((dislike: string) => (
                                    <span key={dislike} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 text-sm font-bold shadow-sm">
                                        {dislike}
                                        <button onClick={() => handleRemoveDislike(dislike)} className="hover:opacity-70 transition-opacity">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                        </button>
                                    </span>
                                ))}
                                <button onClick={handleAddDislike} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#0a1c11] text-zinc-400 border border-white/5 hover:border-white/20 hover:bg-[#0c2415] text-sm font-medium transition-all shadow-sm">
                                    <span>+ Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Meal Planner */}
            <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-[#0c2415] to-[#081a0f] border border-white/5 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                {/* Subtle spotlight effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 rounded-full blur-[80px] group-hover:bg-[#00ff88]/10 transition-colors duration-500"></div>
                
                <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/20 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.24 4.24 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Weekly Meal Planner</h3>
                        <p className="text-sm text-zinc-400 mt-1 font-medium">Organize your nutrition for the week ahead.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-[#00ff88] text-black font-extrabold py-4 px-8 rounded-2xl shadow-[0_10px_20px_rgba(0,255,136,0.15)] hover:bg-[#00ff88]/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full md:w-auto">
                    Open Planner
                </button>
            </div>
        </div>
    );
};

export default Profile;