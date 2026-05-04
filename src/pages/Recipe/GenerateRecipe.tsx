import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractIngredientsFromImage, generateRecipeVariants } from '../../services/aiService';
import { searchIngredients, type IngredientSuggestion } from '../../services/ingredientService';
import { useRecipeStore } from '../../store/recipeStore';
import { useHealthProfileStore } from '../../store/healthProfileStore';
import { AuthContext } from '../../context/AuthContext';

const GenerateRecipe = () => {
    const navigate = useNavigate();
    // Use an empty array initially to let the user upload or start typing
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [apiSuggestions, setApiSuggestions] = useState<IngredientSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setGeneratedRecipes, pendingFile, setPendingFile } = useRecipeStore();
    const { profile } = useHealthProfileStore(); // Get the health profile if available
    const authContext = useContext(AuthContext);
    const userId = authContext?.userId;

    const suggestions = ['Onion', 'Spinach', 'Feta Cheese', 'Bell Pepper', 'Cucumber', 'Greek Yogurt'];

    useEffect(() => {
        if (pendingFile) {
            handleFileProcess(pendingFile);
            setPendingFile(null); // Clear after picking up
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pendingFile]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (inputValue.trim().length >= 2) {
                setIsSearching(true);
                const result = await searchIngredients(inputValue);
                if (result.success) {
                    setApiSuggestions(result.suggestions);
                    setShowSuggestions(true);
                }
                setIsSearching(false);
            } else {
                setApiSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [inputValue]);

    const removeIngredient = (ing: string) => {
        setIngredients(ingredients.filter(i => i !== ing));
    };

    const addIngredient = (ing: string) => {
        if (ing && !ingredients.includes(ing)) {
            setIngredients([...ingredients, ing]);
            setInputValue('');
            setShowSuggestions(false);
        }
    };

    const handleAddClick = () => {
        if (inputValue.trim()) {
            addIngredient(inputValue.trim());
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file); // fail safe
                        }
                    }, 'image/jpeg', 0.8); // 80% quality
                };
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleFileProcess = async (file: File) => {
        setIsExtracting(true);
        setErrorMsg('');

        try {
            const optimizedFile = await compressImage(file);
            const result = await extractIngredientsFromImage(optimizedFile);
            if (result.success && result.data) {
                // Determine if backend returns an array of strings or array of objects with 'name'
                const newIngredients = result.data.map((item: any) =>
                    typeof item === 'string' ? item : (item.name || item)
                );
                // Merge with existing avoiding duplicates
                const merged = [...new Set([...ingredients, ...newIngredients])] as string[];
                setIngredients(merged);
            }
        } catch (error: any) {
            console.error('Error extracting ingredients:', error);
            setErrorMsg(error.message || 'Failed to extract ingredients from image.');
        } finally {
            setIsExtracting(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        await handleFileProcess(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleGenerate = async () => {
        if (ingredients.length === 0) {
            setErrorMsg('Please add at least one ingredient.');
            return;
        }

        setIsGenerating(true);
        setErrorMsg('');

        try {
            const healthProfileData = profile || {}; // Send available profile data
            const result = await generateRecipeVariants(userId, ingredients, healthProfileData);

            if (result.success && result.data) {
                setGeneratedRecipes(result.data);
                navigate('/recipe-variants');
            }
        } catch (error: any) {
            console.error('Error generating recipes:', error);
            setErrorMsg(error.message || 'Failed to generate recipes.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen w-full  text-white p-6 md:p-10 font-sans relative pb-40">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                {/* Header */}
                <header className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <div className="flex-1 flex justify-between items-center">
                        <div>
                            <div
                                onClick={handleCameraClick}
                                className="inline-flex items-center gap-1.5 text-[#00ff84] text-[10px] font-bold tracking-wider mb-1 uppercase cursor-pointer hover:underline"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                Camera Scan
                            </div>
                            <h1 className="text-3xl font-bold">Generate Recipes</h1>
                        </div>
                    </div>
                </header>

                {errorMsg && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl text-sm font-medium">
                        {errorMsg}
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {/* Banner */}
                <div
                    onClick={handleCameraClick}
                    className="w-full h-56 rounded-[2rem] overflow-hidden relative border border-white/10 cursor-pointer group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Vegetables"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                    {isExtracting ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="w-10 h-10 border-4 border-[#00ff84] border-t-transparent rounded-full animate-spin mb-3"></div>
                            <span className="text-white font-bold tracking-wide">AI is analyzing image...</span>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-[#00ff84] text-[#051109] px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                    Tap to Scan Ingredients
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#051109]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                                <div className="w-5 h-5 rounded-full bg-[#00ff84] flex items-center justify-center text-[#051109]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                </div>
                                <span className="text-sm font-bold text-white">{ingredients.length} ingredients detected</span>
                            </div>
                            <div className="absolute bottom-4 right-4 text-[10px] font-bold tracking-widest text-white/60 uppercase bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                                Camera Snap
                            </div>
                        </>
                    )}
                </div>

                {/* Detected Ingredients */}
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Detected Ingredients</h2>
                        <button
                            onClick={() => setIngredients([])}
                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                            Reset
                        </button>
                    </div>

                    {ingredients.length === 0 && !isExtracting ? (
                        <div className="text-gray-500 text-sm py-4 italic border border-dashed border-white/10 rounded-2xl flex items-center justify-center h-24">
                            No ingredients added. Upload an image or add manually.
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {ingredients.map(ing => (
                                <div key={ing} className="bg-[#051a10] border border-[#00ff84]/30 text-[#00ff84] px-5 py-2.5 rounded-full flex items-center gap-2.5 text-sm font-semibold shadow-sm shadow-[#00ff84]/5">
                                    {ing}
                                    <button onClick={() => removeIngredient(ing)} className="hover:bg-[#00ff84]/20 rounded-full p-0.5 transition-colors text-[#00ff84]/70 hover:text-[#00ff84]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add Input */}
                    <div className="flex items-center gap-3 pt-3">
                        <div className="flex-1 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleAddClick()}
                                placeholder="Add an ingredient manually..."
                                className="w-full bg-[#0d2114] border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white font-medium placeholder:text-gray-500 placeholder:font-normal focus:outline-none focus:border-[#00ff84]/50 transition-colors shadow-inner"
                            />

                            {isSearching && (
                                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-[#00ff84] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Autocomplete Suggestions */}
                            {showSuggestions && apiSuggestions.length > 0 && (
                                <div className="absolute left-0 right-0 top-full mt-2 bg-[#0d2114]/50 border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                                    {apiSuggestions.map((sug, index) => (
                                        <button
                                            key={`${sug.name}-${index}`}
                                            onClick={() => addIngredient(sug.name)}
                                            className="w-full text-left px-5 py-3.5 bg-transparent hover:bg-[#00ff84]/10 flex items-center justify-between border-b hover:outline-none rounded-t-2xl last:border-0 group transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#00ff84]/10 flex items-center justify-center text-[#00ff84] group-hover:bg-[#00ff84]/20">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-4.3-4.3" /><circle cx="10" cy="10" r="7" /></svg>
                                                </div>
                                                <div>
                                                    <span className="text-white font-semibold block">{sug.name}</span>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{sug.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-[#00ff84]/60 font-bold">{(sug.confidence * 100).toFixed(0)}% Match</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-[#00ff84] transition-colors"><path d="m5 12 7 7 7-7" /></svg>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleAddClick}
                            disabled={!inputValue.trim()}
                            className="bg-[#0b3622] text-[#00ff84] font-bold px-8 py-4 rounded-2xl disabled:opacity-50 transition-all hover:bg-[#104b30] border border-[#00ff84]/20"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Suggested Additions */}
                <div className="space-y-4 pt-6">
                    <h3 className="text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase">Suggested Additions</h3>
                    <div className="flex flex-wrap gap-2.5">
                        {suggestions.map(sug => (
                            <button
                                key={sug}
                                onClick={() => addIngredient(sug)}
                                className="bg-[#0b1f13] border border-white/5 text-gray-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                {sug}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Generate Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#051109] via-[#051109]/90 to-transparent z-50 pointer-events-none">
                <div className="max-w-4xl mx-auto pointer-events-auto">
                    <button
                        onClick={handleGenerate}
                        disabled={ingredients.length === 0 || isGenerating}
                        className="w-full bg-[#00ff84] text-[#051109] disabled:opacity-50 disabled:cursor-not-allowed font-extrabold text-[1.1rem] py-5 rounded-2xl flex items-center justify-center gap-2 lg:ml-40 hover:bg-[#00e676] active:scale-[0.98] transition-all shadow-[0_4px_30px_rgba(0,255,132,0.15)]"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-[#051109] border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.29 1.29L3 12l5.8 1.9a2 2 0 0 1 1.29 1.29L12 21l1.9-5.8a2 2 0 0 1 1.29-1.29L21 12l-5.8-1.9a2 2 0 0 1-1.29-1.29L12 3Z" /></svg>
                                Generate Recipes ({ingredients.length} ingredients)
                            </>
                        )}
                    </button>
                    <p className="text-center text-gray-500/80 text-[11px] mt-4 font-medium tracking-wide">
                        AI will suggest recipes based on your detected ingredients
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GenerateRecipe;