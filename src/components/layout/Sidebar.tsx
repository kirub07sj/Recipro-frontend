import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
    </svg>
);



const HomeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Home', path: '/dashboard', icon: HomeIcon },
        { name: 'Discover', path: '/discovery', icon: SparklesIcon },
        { name: 'Saved', path: '/saved-recipes', icon: HeartIcon },
        { name: 'Profile', path: '/profile', icon: UserIcon },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-6 left-6 z-50 p-3 text-white bg-[#03100B]/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 transition-all active:scale-95"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Sidebar"
            >
                <MenuIcon isOpen={isOpen} />
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : (window.innerWidth < 768 ? '-120%' : 0),
                    transition: { type: 'spring', damping: 25, stiffness: 200 }
                }}
                className={`
                    fixed top-4 bottom-4 left-4 z-40 w-72  
                    bg-[#0d2114]/60 backdrop-blur-xl border border-white/10
                    rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]
                    flex flex-col md:translate-x-0
                `}
            >
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 px-10 py-10"
                >
                    <img src="/icon.svg" alt="Logo" className="w-14 h-14" />
                    <span className="text-white text-2xl font-bold tracking-tight">Recipro</span>
                </motion.div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-4 space-y-3">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * (index + 1) }}
                            >
                                <NavLink
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => `
                                        flex items-center gap-4 px-6 pl-14 py-4 rounded-[1.5rem] transition-all duration-300
                                        ${isActive
                                            ? 'bg-white text-[#03100B] font-bold shadow-[0_4px_15px_rgba(255,255,255,0.1)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    {({ isActive }) => (
                                        <motion.div
                                            className="flex items-center gap-4 w-full"
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                                            <span className="text-[1.05rem]">{item.name}</span>
                                        </motion.div>
                                    )}
                                </NavLink>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="px-6 py-8"
                >
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ x: 5, backgroundColor: 'rgba(248, 113, 113, 0.05)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-red-400 rounded-[1.5rem] transition-all duration-300 group"
                    >
                        <LogoutIcon className="w-5 h-5 flex-shrink-0 transition-colors group-hover:text-red-400" />
                        <span className="font-semibold text-[1.05rem]">Logout</span>
                    </motion.button>
                </motion.div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
