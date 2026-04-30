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
    setGeneratedRecipes: (recipes: GeneratedRecipe[]) => void;
    setSavedRecipes: (recipes: any[]) => void;
    addSavedRecipe: (recipe: any) => void;
    removeSavedRecipe: (recipeId: string) => void;
    setPendingFile: (file: File | null) => void;
    clearRecipes: () => void;
}

export const useRecipeStore = create<RecipeStoreState>((set) => ({
    generatedRecipes: [],
    savedRecipes: [],
    pendingFile: null,
    setGeneratedRecipes: (recipes) => set({ generatedRecipes: recipes }),
    setSavedRecipes: (recipes) => set({ savedRecipes: recipes }),
    addSavedRecipe: (recipe) => set((state) => ({ savedRecipes: [...state.savedRecipes, recipe] })),
    removeSavedRecipe: (recipeId) => set((state) => ({ 
        savedRecipes: state.savedRecipes.filter(r => r.recipeId !== recipeId) 
    })),
    setPendingFile: (file) => set({ pendingFile: file }),
    clearRecipes: () => set({ generatedRecipes: [] }),
}));
