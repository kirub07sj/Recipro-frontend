import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { getUserScansService, deleteScanService } from '../../services/scanService';

const RecentScans = () => {
    const { userId } = useAuth();
    const [scans, setScans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchScans();
        }
    }, [userId]);

    const fetchScans = async () => {
        setLoading(true);
        const data = await getUserScansService(userId!);
        setScans(data);
        setLoading(false);
    };

    const handleDelete = async (scanId: string) => {
        const success = await deleteScanService(scanId);
        if (success) {
            setScans(prev => prev.filter(scan => scan._id !== scanId));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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
            className="flex flex-col gap-8 pb-12 min-h-screen text-white"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-4xl font-bold mb-2 text-white">Recent Scans</h1>
                <p className="text-gray-400">History of the ingredients you've scanned</p>
            </motion.div>

            {loading ? (
                <div className="text-center text-[#00E676] py-10">Loading your scans...</div>
            ) : scans.length === 0 ? (
                <motion.div variants={itemVariants} className="text-gray-400 text-center py-10">
                    No recent scans found. Try scanning some ingredients to see them here!
                </motion.div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {scans.map((scan, index) => (
                            <motion.div
                                key={scan._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[#061B12] rounded-3xl p-6 border border-[#0A2A1E] flex flex-col relative group hover:border-[#00E676]/30 transition-all"
                            >
                                <button
                                    onClick={() => handleDelete(scan._id)}
                                    className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                                    title="Delete scan"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                
                                <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#00E676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(scan.createdAt).toLocaleDateString()} at {new Date(scan.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                
                                <h3 className="text-xl font-bold mb-4 text-[#00E676]">Detected Ingredients</h3>
                                
                                <div className="flex gap-2 flex-wrap">
                                    {scan.ingredients.map((ingredient: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-[#03100B] border border-[#0A2A1E] rounded-lg text-sm font-medium text-gray-300">
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    );
};

export default RecentScans;
