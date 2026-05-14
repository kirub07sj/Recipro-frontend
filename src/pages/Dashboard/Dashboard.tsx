import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useRecipeStore } from '../../store/recipeStore';
import { useAuth } from '../../hooks/useAuth';
import { useHealthProfileStore } from '../../store/healthProfileStore';
import { useEffect } from 'react';
import { getRecentlyViewedService } from '../../services/recentlyViewedService';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setPendingFile, recentlyViewed, setRecentlyViewed } = useRecipeStore();
    const { profile, fetchProfile } = useHealthProfileStore();
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            // Fetch recently viewed
            getRecentlyViewedService(userId, 20)
                .then(res => {
                    if (res.success) {
                        setRecentlyViewed(res.data);
                    }
                })
                .catch(console.error);

            // Fetch health profile if not already loaded
            if (!profile) {
                fetchProfile(userId).catch(console.error);
            }
        }
    }, [userId, setRecentlyViewed, profile, fetchProfile]);

    const handleSnapClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPendingFile(file);
            navigate('/generate-recipe');
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
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
        >
            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-8">
                        <motion.header variants={itemVariants} className="flex items-center justify-between">
                            <div>
                                <p className="text-[#00ff84] text-xs font-bold uppercase tracking-widest mb-1">
                                    Good Evening
                                </p>
                                <h1 className="text-3xl font-bold text-white mb-1">
                                    Ready to cook, {localStorage.getItem('userName') || 'Alex'}?
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="px-3 py-1 bg-[#00ff84]/10 text-[#00ff84] text-[10px] font-bold rounded-full border border-[#00ff84]/20 flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                                        {profile?.dietMode || 'Standard'} Profile Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 bg-[#0d2114] rounded-full text-gray-400 hover:text-[#00ff84] transition-colors relative"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell" aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00ff84] rounded-full border-2 border-[#051109]"></span>
                                </motion.button>
                            </div>
                        </motion.header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                onClick={handleSnapClick}
                                className="bg-[#00ff84] rounded-[32px] p-8 border border-white/5 relative overflow-hidden group cursor-pointer"
                            >
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-extrabold text-[#051109] mb-2 leading-tight">
                                        What's in your<br />fridge today?
                                    </h2>
                                    <div className="mt-8 flex items-center gap-4 bg-[#051109] text-[#00ff84] px-6 py-4 rounded-2xl w-fit group-hover:scale-105 transition-transform">

                                        <p className="font-bold text-lg">Snap Ingredient to get recipes</p>
                                    </div>
                                </div>
                                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-line text-[#051109]" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path></svg>
                                </div>
                            </motion.div>

                            <div className="flex flex-col gap-4">
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    onClick={() => navigate('/generate-recipe')}
                                    className="flex-1 bg-[#0d2114] rounded-[32px] p-6 border border-white/5 flex items-center justify-between group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-[#051109] rounded-2xl flex items-center justify-center text-[#00ff84]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload" aria-hidden="true"><path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Upload Photo</h3>
                                            <p className="text-sm text-gray-400">Analyze gallery items</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00ff84] group-hover:text-[#051109] transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
                                    </div>
                                </motion.div>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                    className="flex-1 bg-[#0d2114] rounded-[32px] p-6 border border-white/5 flex items-center justify-between group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-[#051109] rounded-2xl flex items-center justify-center text-[#00ff84]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Recent Scans</h3>
                                            <p className="text-sm text-gray-400">Quickly cook it again</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00ff84] group-hover:text-[#051109] transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <motion.section variants={itemVariants}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Recently Viewed</h2>

                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {recentlyViewed.length > 0 ? recentlyViewed.map((item, index) => (
                                    <motion.div
                                        key={item._id || item.recipeId || index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * index }}
                                        whileHover={{ y: -10 }}
                                        onClick={() => navigate(`/recipe/${item.recipeId}`)}
                                        className="bg-[#0d2114] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                    >
                                        <div className="relative aspect-[4/3]">
                                            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} src={item.image} />
                                            {item.dietary && (
                                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1">{item.dietary}</div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00ff84] transition-colors line-clamp-1">{item.title}</h3>
                                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    {item.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                                                    {item.calories}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="col-span-full py-12 bg-[#0d2114] rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                                        <p>No recently viewed recipes</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </main>
        </motion.div>
    )
}

export default Dashboard