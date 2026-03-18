import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
    </svg>
);

const ChefHatIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C9 2 7.034 4 7.034 6A3.996 3.996 0 004 9.5C4 11.233 5.023 12.721 6.5 13.33V19C6.5 20.104 7.396 21 8.5 21H15.5C16.604 21 17.5 20.104 17.5 19V13.33C18.977 12.721 20 11.233 20 9.5A3.996 3.996 0 0016.966 6C16.966 4 15 2 12 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 17H17.5" />
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
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-300 hover:text-white bg-[#03100B] rounded-lg shadow-lg border border-[#0A2A1E]"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Sidebar"
            >
                <MenuIcon isOpen={isOpen} />
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#03100B] border-r border-[#0A2A1E] 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-8 py-8">
                    <div className="bg-[#00E676] p-2 rounded-full shadow-[0_0_15px_rgba(0,230,118,0.4)]">
                        <ChefHatIcon className="w-6 h-6 text-[#03100B]" />
                    </div>
                    <span className="text-white text-xl font-bold tracking-wide">Recipro</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-2 space-y-2 mt-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300
                  ${isActive
                                        ? 'bg-[#002C1B] text-white font-semibold border border-[#005C3A] shadow-[0_0_20px_rgba(0,230,118,0.05)]'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#061B12]'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 mb-2">
                    {/* We could also add a user profile mini-card here if needed, but the prompt just specified "Logout" at the bottom */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:text-red-400 hover:bg-[#120808] rounded-2xl transition-all duration-300"
                    >
                        <LogoutIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
