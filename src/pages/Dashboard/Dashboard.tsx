
export const MOCK_RECIPES = [
    {
        id: 1,
        title: "Zesty Lemon Chicken Salad",
        rating: 4.8,
        time: "15 min",
        calories: "350 kcal",
        protein: "32g",
        healthMatch: "94%",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "Beginner",
        dietary: "Low Carb, High Protein",
        description: "A fresh and zesty salad packed with lean protein and vibrant flavors, perfect for a quick lunch.",
        ingredients: [
            { id: "i1", name: "Chicken Breast", amount: "200g" },
            { id: "i2", name: "Mixed Greens", amount: "2 cups" },
            { id: "i3", name: "Lemon", amount: "1 unit" },
            { id: "i4", name: "Cherry Tomatoes", amount: "1 cup" },
            { id: "i5", name: "Olive Oil", amount: "2 tbsp" }
        ],
        instructions: [
            { time: "5 MIN", text: "Grill or pan-fry the seasoned chicken breast until fully cooked." },
            { time: "5 MIN", text: "Wash and prepare the mixed greens and cherry tomatoes." },
            { time: "2 MIN", text: "Whisk olive oil and fresh lemon juice to make the dressing." },
            { time: "3 MIN", text: "Slice the cooked chicken, toss with greens and dressing, and serve." }
        ],
        chefTip: "Marinate the chicken in lemon juice for 10 minutes before cooking for extra flavor."
    },
    {
        id: 2,
        title: "Avocado Toast with Egg",
        rating: 4.9,
        time: "10 min",
        calories: "420 kcal",
        protein: "18g",
        healthMatch: "88%",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "Beginner",
        dietary: "Vegetarian",
        description: "A classic, nutritious breakfast rich in healthy fats and protein to start your day right.",
        ingredients: [
            { id: "i1", name: "Sourdough Bread", amount: "2 slices" },
            { id: "i2", name: "Ripe Avocado", amount: "1 unit" },
            { id: "i3", name: "Eggs", amount: "2 units" },
            { id: "i4", name: "Red Pepper Flakes", amount: "1 tsp" },
            { id: "i5", name: "Salt and Pepper", amount: "to taste" }
        ],
        instructions: [
            { time: "3 MIN", text: "Toast the sourdough bread slices until golden brown." },
            { time: "3 MIN", text: "Mash the avocado with salt and pepper." },
            { time: "4 MIN", text: "Cook eggs to your preference (poached, fried, or scrambled)." },
            { time: "1 MIN", text: "Spread avocado on toast, top with eggs, and sprinkle red pepper flakes." }
        ],
        chefTip: "A squeeze of fresh lime juice in the mashed avocado prevents browning and adds a bright zesty kick."
    },
    {
        id: 3,
        title: "Spicy Quinoa Bowl",
        rating: 4.7,
        time: "20 min",
        calories: "450 kcal",
        protein: "14g",
        healthMatch: "92%",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "Intermediate",
        dietary: "Vegan, Gluten-Free",
        description: "A hearty and spicy bowl loaded with plant-based protein, fiber, and delicious veggies.",
        ingredients: [
            { id: "i1", name: "Quinoa", amount: "1 cup (cooked)" },
            { id: "i2", name: "Black Beans", amount: "1/2 cup" },
            { id: "i3", name: "Corn", amount: "1/4 cup" },
            { id: "i4", name: "Jalapeño", amount: "1 unit" },
            { id: "i5", name: "Avocado", amount: "1/2 unit" },
            { id: "i6", name: "Salsa", amount: "2 tbsp" }
        ],
        instructions: [
            { time: "15 MIN", text: "Cook the quinoa according to package instructions if not pre-cooked." },
            { time: "2 MIN", text: "Rinse the black beans and corn." },
            { time: "2 MIN", text: "Slice the jalapeño and avocado." },
            { time: "1 MIN", text: "Assemble the bowl starting with quinoa, then add toppings and salsa." }
        ],
        chefTip: "Rinse quinoa thoroughly before cooking to remove its natural bitter coating."
    },
    {
        id: 4,
        title: "Berry Acai Smoothie",
        rating: 4.9,
        time: "5 min",
        calories: "280 kcal",
        protein: "5g",
        healthMatch: "96%",
        image: "https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "Beginner",
        dietary: "Vegan",
        description: "A refreshing and antioxidant-rich smoothie perfect for a quick snack or light breakfast.",
        ingredients: [
            { id: "i1", name: "Acai Puree", amount: "1 packet" },
            { id: "i2", name: "Mixed Berries (Frozen)", amount: "1 cup" },
            { id: "i3", name: "Banana", amount: "1/2 unit" },
            { id: "i4", name: "Almond Milk", amount: "1/2 cup" },
            { id: "i5", name: "Chia Seeds", amount: "1 tbsp" }
        ],
        instructions: [
            { time: "1 MIN", text: "Gather all ingredients and add them to the blender." },
            { time: "2 MIN", text: "Blend on high until smooth and creamy." },
            { time: "1 MIN", text: "Check consistency. Add more almond milk if it's too thick." },
            { time: "1 MIN", text: "Pour into a glass, top with extra chia seeds, and enjoy." }
        ],
        chefTip: "Use frozen bananas instead of ice cubes to keep the smoothie creamy and thick."
    }
];


import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <header className="flex items-center justify-between">
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
                                        Low Carb Profile Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2.5 bg-[#0d2114] rounded-full text-gray-400 hover:text-[#00ff84] transition-colors relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell" aria-hidden="true"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
                                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00ff84] rounded-full border-2 border-[#051109]"></span>
                                </button>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div onClick={() => navigate('/generate-recipe')} className="bg-[#00ff84] rounded-[32px] p-8 border border-white/5 relative overflow-hidden group cursor-pointer" style={{ transform: 'none' }}>
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-extrabold text-[#051109] mb-2 leading-tight">
                                        What's in your<br />fridge today?
                                    </h2>
                                    <div className="mt-8 flex items-center gap-4 bg-[#051109] text-[#00ff84] px-6 py-4 rounded-2xl w-fit group-hover:scale-105 transition-transform">

                                        <p className="font-bold text-lg">Enter Ingredients to get recipes</p>
                                    </div>
                                </div>
                                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-line text-[#051109]" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 12h10"></path></svg>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div onClick={() => navigate('/generate-recipe')} className="flex-1 bg-[#0d2114] rounded-[32px] p-6 border border-white/5 flex items-center justify-between group cursor-pointer" style={{ transform: 'none' }}>
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
                                </div>
                                <div className="flex-1 bg-[#0d2114] rounded-[32px] p-6 border border-white/5 flex items-center justify-between group cursor-pointer" style={{ transform: 'translateX(0.0059972px)' }}>
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
                                </div>
                            </div>
                        </div>

                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Cook it again</h2>
                                <button className="text-[#00ff84] text-sm font-bold flex items-center gap-1 hover:underline">
                                    View all
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {MOCK_RECIPES.map((recipe, idx) => (
                                    <div
                                        key={recipe.id}
                                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                                        className="bg-[#0d2114] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                        style={{ transform: idx === 2 ? 'translateY(-0.0078834px)' : 'none' }}
                                    >
                                        <div className="relative aspect-[4/3]">
                                            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={recipe.title} src={recipe.image} />
                                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1">⭐ {recipe.rating}</div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00ff84] transition-colors line-clamp-1">{recipe.title}</h3>
                                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock" aria-hidden="true"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
                                                    {recipe.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                                                    {recipe.calories}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard