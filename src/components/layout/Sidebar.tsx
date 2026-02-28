import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-[260px] bg-[#080d0a] border-r border-white/5 flex flex-col p-6 h-full">
            <div className="flex items-center gap-3 text-2xl font-bold mb-10">
                <div className="w-9 h-9 bg-[#00ff84] rounded-[10px] flex items-center justify-center text-black">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                        <line x1="6" y1="17" x2="18" y2="17" />
                    </svg>
                </div>
                <span>Recipro</span>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors text-[15px] ${isActive ? "bg-[#00ff84]/10 text-[#00ff84]" : "text-[#8b9a91] hover:text-white hover:bg-white/5"
                        }`
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    Home
                </NavLink>
                <NavLink
                    to="/discover"
                    className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors text-[15px] ${isActive ? "bg-[#00ff84]/10 text-[#00ff84]" : "text-[#8b9a91] hover:text-white hover:bg-white/5"
                        }`
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    Discover
                </NavLink>
                <NavLink
                    to="/saved-recipes"
                    className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors text-[15px] ${isActive ? "bg-[#00ff84]/10 text-[#00ff84]" : "text-[#8b9a91] hover:text-white hover:bg-white/5"
                        }`
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                    My Cookbook
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors text-[15px] ${isActive ? "bg-[#00ff84]/10 text-[#00ff84]" : "text-[#8b9a91] hover:text-white hover:bg-white/5"
                        }`
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    Favorites
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors text-[15px] ${isActive ? "bg-[#00ff84]/10 text-[#00ff84]" : "text-[#8b9a91] hover:text-white hover:bg-white/5"
                        }`
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Profile
                </NavLink>
            </nav>

            <div className="flex flex-col gap-4 mt-auto">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-medium transition-colors text-[15px] ${isActive ? "bg-[#00ff84]/10 text-[#00ff84]" : "text-[#8b9a91] hover:text-white hover:bg-white/5"
                        }`
                    }
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    Settings
                </NavLink>

                <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Alex Doe" className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col">
                        <h4 className="font-semibold text-sm m-0">Alex Doe</h4>
                        <p className="text-[10px] font-bold text-[#00ff84] mt-0.5 mb-0 tracking-wide">HEALTH SCORE: 85</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
