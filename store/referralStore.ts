import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import referralService, { Referral } from '@/lib/services/referral.service';

interface ReferralState {
    referrals: Referral[];
    currentReferral: Referral | null;
    isLoading: boolean;
    error: string | null;
    fetchReferrals: () => Promise<void>;
    getReferralById: (referralId: string) => Promise<void>;
    createReferral: (referralData: Partial<Referral>) => Promise<void>;
    updateReferral: (referralId: string, referralData: Partial<Referral>) => Promise<void>;
    deleteReferral: (referralId: string) => Promise<void>;
    clearError: () => void;
}

export const useReferralStore = create<ReferralState>()(
    persist(
        (set) => ({
            referrals: [],
            currentReferral: null,
            isLoading: false,
            error: null,

            fetchReferrals: async () => {
                try {
                    set({ isLoading: true, error: null });
                    const referrals = await referralService.getAllReferrals();
                    set({ referrals, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch referrals',
                        isLoading: false,
                    });
                }
            },

            getReferralById: async (referralId: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const referral = await referralService.getReferralById(referralId);
                    set({ currentReferral: referral, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to fetch referral',
                        isLoading: false,
                    });
                }
            },

            createReferral: async (referralData: Partial<Referral>) => {
                try {
                    set({ isLoading: true, error: null });
                    const newReferral = await referralService.createReferral(referralData);
                    set((state) => ({
                        referrals: [...state.referrals, newReferral],
                        currentReferral: newReferral,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to create referral',
                        isLoading: false,
                    });
                }
            },

            updateReferral: async (referralId: string, referralData: Partial<Referral>) => {
                try {
                    set({ isLoading: true, error: null });
                    const updatedReferral = await referralService.updateReferral(referralId, referralData);
                    set((state) => ({
                        referrals: state.referrals.map((referral) =>
                            referral.id === referralId ? updatedReferral : referral
                        ),
                        currentReferral: state.currentReferral?.id === referralId ? updatedReferral : state.currentReferral,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to update referral',
                        isLoading: false,
                    });
                }
            },

            deleteReferral: async (referralId: string) => {
                try {
                    set({ isLoading: true, error: null });
                    await referralService.deleteReferral(referralId);
                    set((state) => ({
                        referrals: state.referrals.filter((referral) => referral.id !== referralId),
                        currentReferral: state.currentReferral?.id === referralId ? null : state.currentReferral,
                        isLoading: false,
                    }));
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Failed to delete referral',
                        isLoading: false,
                    });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'referral-storage',
        }
    )
); 