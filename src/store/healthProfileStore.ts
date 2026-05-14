import { create } from 'zustand';
import { getHealthProfileService, createHealthProfileService, updateHealthProfileService } from '../services/healthProfileService';
import { getTodayIntakeService, consumeRecipeService } from '../services/intakeService';

export interface HealthProfile {
    _id: string;
    user: string;
    weight: number;
    height: number;
    age: number;
    gender: string;
    activityLevel: string;
    fitnessGoal: string;
    cuisine: string;
    dietMode: string;
    allergies: string[];
    dislikes: string[];
    conditions: string[];
    healthScore: number;
    dailyGoal: number;
    createdAt: string;
    updatedAt: string;
}

interface HealthProfileState {
    profile: HealthProfile | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: (userId: string) => Promise<void>;
    createProfile: (data: any) => Promise<void>;
    updateProfile: (userId: string, data: any) => Promise<void>;
    clearProfile: () => void;
    todayIntake: any | null;
    fetchTodayIntake: (userId: string) => Promise<void>;
    consumeRecipe: (userId: string, recipe: { id: string, title: string, calories: number }) => Promise<void>;
}

export const useHealthProfileStore = create<HealthProfileState>((set) => ({
    profile: null,
    isLoading: false,
    error: null,
    fetchProfile: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const result = await getHealthProfileService(userId);
            set({ profile: result.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false, profile: null });
            throw error;
        }
    },
    createProfile: async (data: any) => {
        set({ isLoading: true, error: null });
        try {
            const result = await createHealthProfileService(data);
            set({ profile: result.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
    updateProfile: async (userId: string, data: any) => {
        set({ isLoading: true, error: null });
        try {
            const result = await updateHealthProfileService(userId, data);
            set({ profile: result.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
    clearProfile: () => set({ profile: null, error: null, todayIntake: null }),
    todayIntake: null,
    fetchTodayIntake: async (userId: string) => {
        try {
            const result = await getTodayIntakeService(userId);
            set({ todayIntake: result.data });
        } catch (error) {
            console.error('Error fetching today intake:', error);
        }
    },
    consumeRecipe: async (userId: string, recipe: { id: string, title: string, calories: number }) => {
        try {
            const result = await consumeRecipeService(userId, recipe);
            set({ todayIntake: result.data });
        } catch (error: any) {
            throw error;
        }
    }
}));
