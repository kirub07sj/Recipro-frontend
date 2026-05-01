import { create } from 'zustand';

export interface GeneratedRecipe {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
    calories: string;
    difficulty: string;
    match: number;
    healthMatch: string;
    protein: string;
    dietary: string;
    chefTip?: string;
    ingredients: { id: string; name: string; amount: string }[];
    instructions: { 
        timeSeconds: number;
        time: string; 
        title: string;
        text: string; 
        tip?: string;
    }[];
    tags: string[];
}

interface RecipeStoreState {
    generatedRecipes: GeneratedRecipe[];
    savedRecipes: any[];
    pendingFile: File | null;
    recentlyViewed: any[];
    setGeneratedRecipes: (recipes: GeneratedRecipe[]) => void;
    setSavedRecipes: (recipes: any[]) => void;
    setRecentlyViewed: (recipes: any[]) => void;
    addRecentlyViewed: (recipe: any) => void;
    addSavedRecipe: (recipe: any) => void;
    removeSavedRecipe: (recipeId: string) => void;
    setPendingFile: (file: File | null) => void;
    clearRecipes: () => void;
}

export const useRecipeStore = create<RecipeStoreState>((set) => ({
    generatedRecipes: [],
    savedRecipes: [],
    recentlyViewed: [],
    pendingFile: null,
    setGeneratedRecipes: (recipes) => set({ generatedRecipes: recipes }),
    setSavedRecipes: (recipes) => set({ savedRecipes: recipes }),
    setRecentlyViewed: (recipes) => set({ recentlyViewed: recipes }),
    addRecentlyViewed: (recipe) => set((state) => {
        const filtered = state.recentlyViewed.filter(r => (r.recipeId || r.id) !== (recipe.recipeId || recipe.id));
        const newItem = {
            ...recipe,
            recipeId: recipe.recipeId || recipe.id,
            viewedAt: new Date().toISOString()
        };
        return { recentlyViewed: [newItem, ...filtered].slice(0, 10) };
    }),
    addSavedRecipe: (recipe) => set((state) => ({ savedRecipes: [...state.savedRecipes, recipe] })),
    removeSavedRecipe: (recipeId) => set((state) => ({ 
        savedRecipes: state.savedRecipes.filter(r => r.recipeId !== recipeId) 
    })),
    setPendingFile: (file) => set({ pendingFile: file }),
    clearRecipes: () => set({ generatedRecipes: [] }),
}));
