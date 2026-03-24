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
    pendingFile: File | null;
    setGeneratedRecipes: (recipes: GeneratedRecipe[]) => void;
    setPendingFile: (file: File | null) => void;
    clearRecipes: () => void;
}

export const useRecipeStore = create<RecipeStoreState>((set) => ({
    generatedRecipes: [],
    pendingFile: null,
    setGeneratedRecipes: (recipes) => set({ generatedRecipes: recipes }),
    setPendingFile: (file) => set({ pendingFile: file }),
    clearRecipes: () => set({ generatedRecipes: [] }),
}));
