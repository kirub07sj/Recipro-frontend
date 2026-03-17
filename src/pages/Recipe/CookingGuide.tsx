

const CookingGuide = () => {
  return (
    <div className="min-h-screen w-full bg-[#05160b] text-white font-sans selection:bg-[#15803d] selection:text-white flex flex-col items-center justify-start overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#15803d] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#064e3b] rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 py-12 flex flex-col h-full" style={{ opacity: 1 }}>
        {/* Header - Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-[#4ade80] text-sm font-bold tracking-[0.2em] uppercase mb-1">Step 1 of 5</h2>
              <div className="h-1 w-64 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#4ade80]" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chef-hat text-[#4ade80]"
                aria-hidden="true"
              >
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
                <path d="M6 17h12"></path>
              </svg>
              <span>IMMERSIVE MODE</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow">
          <div className="space-y-6" style={{ opacity: 1, transform: 'none' }}>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">Prepare the Base</h1>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              Finely chop the shallots and mince the garlic. Heat 2 tablespoons of extra virgin olive oil in a large skillet over medium-low heat. Sauté until translucent but not browned.
            </p>
            <div className="p-4 bg-[#15803d]/10 border-l-4 border-[#15803d] rounded-r-xl">
              <p className="text-sm italic text-[#4ade80]">
                <span className="font-bold not-italic mr-2">CHEF'S TIP:</span>
                Don't rush this! Slow cooking shallots brings out their natural sweetness.
              </p>
            </div>
          </div>

          {/* Timer Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/5 scale-110"></div>
              <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                <circle
                  className="text-white/10"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="50%"
                  cy="50%"
                ></circle>
                <circle
                  className="text-[#4ade80]"
                  strokeWidth="6"
                  strokeDasharray="439.822971502571"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="50%"
                  cy="50%"
                  strokeDashoffset="0"
                ></circle>
              </svg>
              <div className="text-center">
                <div className="text-5xl font-mono font-bold tracking-widest">3:00</div>
                <div className="text-xs text-white/40 uppercase tracking-[0.3em] mt-1">Remaining</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <button
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                title="Reset Timer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-ccw"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
              <button className="group relative flex items-center justify-center w-16 h-16 rounded-full transition-all active:scale-95 shadow-lg bg-[#4ade80] hover:bg-[#22c55e] text-[#05160b]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play ml-1"
                  aria-hidden="true"
                >
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
                </svg>
              </button>
              <div className="w-12 h-12 flex items-center justify-center"></div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto pt-16 flex items-center justify-between">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all opacity-0 pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span>Back</span>
          </button>
          <button className="group flex items-center gap-3 px-10 py-4 bg-[#4ade80] text-[#05160b] rounded-2xl font-bold transition-all hover:bg-[#22c55e] active:scale-95 shadow-xl shadow-[#4ade80]/10">
            <span>Next Step</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookingGuide