import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#05160b] flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#00E676]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#00E676]/5 rounded-full blur-3xl"></div>

            {/* Main Content */}
            <div className="relative z-10 animate-fade-in">
                {/* 404 Text with Glow */}
                <div className="relative mb-8">
                    <h1 className="text-[10rem] md:text-[15rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00E676] to-[#009e52] opacity-20 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#00E676] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,230,118,0.3)] transform -rotate-12">
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-[#03100B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C9 2 7.034 4 7.034 6A3.996 3.996 0 004 9.5C4 11.233 5.023 12.721 6.5 13.33V19C6.5 20.104 7.396 21 8.5 21H15.5C16.604 21 17.5 20.104 17.5 19V13.33C18.977 12.721 20 11.233 20 9.5A3.996 3.996 0 0016.966 6C16.966 4 15 2 12 2Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Off the Menu!
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
                    It seems the page you're looking for doesn't exist or has been moved. 
                    Let's get you back to the kitchen to find something delicious.
                </p>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#00E676] text-[#03100B] font-bold py-4 px-10 rounded-2xl hover:bg-[#00C853] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,230,118,0.2)]"
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#0A2A1E] text-white font-bold py-4 px-10 rounded-2xl border border-[#1a3a2e] hover:bg-[#123628] transition-all active:scale-95"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
