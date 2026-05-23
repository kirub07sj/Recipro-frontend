import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockRecipes } from '../../data/mockRecipes';
import { useRecipeStore } from '../../store/recipeStore';
import { useHealthProfileStore } from '../../store/healthProfileStore';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircle2, Flame, Loader2 } from 'lucide-react';
import { getFriendlyErrorMessage } from '../../utils/errorHelper';

const CookingGuide = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useAuth();
  const { generatedRecipes, savedRecipes } = useRecipeStore();

  let recipeData = mockRecipes.find(r => r.id === id) ||
    generatedRecipes.find(r => r.id === id) ||
    savedRecipes.find(r => r.recipeId === id) ||
    mockRecipes[0];

  // Normalize ID (saved recipes use recipeId)
  if (recipeData && !recipeData.id && (recipeData as any).recipeId) {
    recipeData = { ...recipeData, id: (recipeData as any).recipeId };
  }

  const steps = recipeData?.instructions || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0].timeSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isConsuming, setIsConsuming] = useState(false);
  const [hasConsumed, setHasConsumed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { consumeRecipe } = useHealthProfileStore();

  const stepData = steps[currentStep];
  const totalSteps = steps.length;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    // Reset timer when step changes
    setTimeLeft(stepData.timeSeconds);
    setIsRunning(false);
  }, [currentStep, stepData.timeSeconds]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev: number) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(stepData.timeSeconds);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished!
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const timerProgress = stepData.timeSeconds > 0 ? timeLeft / stepData.timeSeconds : 0;
  const dashOffset = 439.8 * (1 - timerProgress);

  if (isFinished) {
    return (
      <div className="min-h-screen w-full bg-[#05160b] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
          <div className="w-24 h-24 bg-[#00ff88]/10 rounded-full flex items-center justify-center mb-6 border-[6px] border-[#00ff88]/20 relative">
            <div className="w-14 h-14 bg-[#00ff88] rounded-full flex items-center justify-center shadow-[0_0_20px_#00ff88]">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#05160b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
          </div>

          <h1 className="text-[2rem] font-black mb-4 text-white tracking-tight">Recipe Completed!</h1>
          <p className="text-zinc-400 mb-10 text-sm leading-relaxed max-w-xs mx-auto">
            You've successfully mastered this dish. Time to plate up and enjoy your healthy creation!
          </p>

          <div className="flex gap-4 w-full mb-10">
            <div className="flex-1 bg-[#0a1c11] border border-white/5 rounded-2xl py-6 px-4 flex flex-col items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
              <div className="text-xl font-bold text-white leading-tight">{recipeData.calories}</div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Per Serving</div>
            </div>
            <div className="flex-1 bg-[#0a1c11] border border-white/5 rounded-2xl py-6 px-4 flex flex-col items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <div className="text-xl font-bold text-white leading-tight">{recipeData.time}</div>
              <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Cooking Time</div>
            </div>
          </div>

          <button
            onClick={() => { setIsFinished(false); setCurrentStep(0); setTimeLeft(steps[0].timeSeconds); }}
            className="w-full bg-white text-black font-extrabold text-sm py-4 rounded-xl flex items-center justify-center gap-2 mb-3 hover:bg-zinc-200 transition-colors shadow-lg active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            Cook Again
          </button>

          {error && (
            <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-red-400 text-xs animate-fade-in shadow-[0_0_12px_rgba(239,68,68,0.05)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span className="font-medium text-left leading-relaxed">{error}</span>
            </div>
          )}

          <button
            disabled={hasConsumed || isConsuming}
            onClick={async () => {
              try {
                setIsConsuming(true);
                setError(null);
                if (!userId) throw new Error("Must be logged in to record intake");
                await consumeRecipe(userId, {
                  id: recipeData.id,
                  title: recipeData.title,
                  calories: Number(recipeData.calories.replace(' kcal', '')) || 0
                });
                setHasConsumed(true);
              } catch (err: any) {
                console.error('Failed to consume:', err);
                setError(getFriendlyErrorMessage(err));
              } finally {
                setIsConsuming(false);
              }
            }}
            className={`w-full font-extrabold text-sm py-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all shadow-lg active:scale-95 ${hasConsumed
              ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30'
              : 'bg-[#00ff88] text-[#05160b] hover:bg-[#00cc6a]'
              }`}
          >
            {isConsuming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : hasConsumed ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Flame className="w-5 h-5" />
            )}
            {isConsuming ? 'Recording...' : hasConsumed ? 'Calories Recorded!' : 'Mark as Consumed'}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="text-zinc-500 text-xs font-semibold hover:text-white transition-colors flex items-center gap-1 group"
          >
            Back to My Cookbook
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    );
  }

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
              <h2 className="text-[#4ade80] text-sm font-bold tracking-[0.2em] uppercase mb-1">Step {currentStep + 1} of {totalSteps}</h2>
              <div className="h-1 w-64 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#4ade80] transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10 relative z-20 hover:bg-white/10 cursor-pointer transition-colors" onClick={() => navigate(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-white"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              <span>EXIT TEXT</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow">
          <div className="space-y-6" style={{ opacity: 1, transform: 'none' }}>
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight">{stepData.title}</h1>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              {stepData.text}
            </p>
            {stepData.tip && (
              <div className="p-4 bg-[#15803d]/10 border-l-4 border-[#15803d] rounded-r-xl">
                <p className="text-sm italic text-[#4ade80]">
                  <span className="font-bold not-italic mr-2">CHEF'S TIP:</span>
                  {stepData.tip}
                </p>
              </div>
            )}
          </div>

          {/* Timer Section */}
          {stepData.timeSeconds > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-white/5 scale-110 shadow-xl shadow-black/20"></div>
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
                    className="text-[#4ade80] transition-all ease-linear"
                    strokeWidth="6"
                    strokeDasharray="439.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="50%"
                    cy="50%"
                    strokeDashoffset={dashOffset}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-mono font-bold tracking-widest leading-none drop-shadow-md">{formatTime(timeLeft)}</div>
                  <div className="text-xs text-white/40 uppercase tracking-[0.3em] mt-3 font-semibold">{timeLeft === 0 ? "Done" : "Remaining"}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-12 relative z-20">
                <button
                  onClick={resetTimer}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                  title="Reset Timer"
                  disabled={timeLeft === stepData.timeSeconds}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                </button>
                <button
                  onClick={toggleTimer}
                  disabled={timeLeft === 0}
                  className={`group relative flex items-center justify-center w-16 h-16 rounded-full transition-all active:scale-95 shadow-lg ${timeLeft === 0 ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed' : 'bg-[#4ade80] hover:bg-[#22c55e] text-[#05160b]'}`}
                >
                  {isRunning ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                  )}
                </button>
                <div className="w-12 h-12 flex items-center justify-center"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-64 h-64 flex flex-col items-center justify-center bg-white/5 rounded-full border-4 border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ade80] mb-4"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span className="text-white/60 font-medium tracking-wider">NO TIMER</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-auto pt-16 flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${currentStep === 0 ? 'text-white/40 hover:bg-white/5' : 'text-white hover:bg-white/10'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            <span>{currentStep === 0 ? 'Exit Guide' : 'Back'}</span>
          </button>
          <button
            onClick={handleNext}
            className="group flex items-center gap-3 px-10 py-4 bg-[#4ade80] text-[#05160b] rounded-2xl font-bold transition-all hover:bg-[#22c55e] active:scale-95 shadow-xl shadow-[#4ade80]/10"
          >
            <span>{currentStep === totalSteps - 1 ? 'Finish' : 'Next Step'}</span>
            {currentStep < totalSteps - 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"></path></svg>
            )}
            {currentStep === totalSteps - 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check group-hover:scale-110 transition-transform"><path d="M20 6 9 17l-5-5"></path></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookingGuide;