import { create } from 'zustand';
import { getHealthProfileService, createHealthProfileService, updateHealthProfileService } from '../services/healthProfileService';

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
    clearProfile: () => set({ profile: null, error: null })
}));
