import api from '../api';

export interface Referral {
    id: string;
    referrerId: string;
    referredId: string;
    status: 'pending' | 'completed' | 'expired';
    rewardAmount: number;
    createdAt: string;
    updatedAt: string;
}

const referralService = {
    getAllReferrals: async () => {
        const response = await api.get('/referrals');
        return response.data;
    },

    getReferralById: async (referralId: string) => {
        const response = await api.get(`/referrals/${referralId}`);
        return response.data;
    },

    createReferral: async (referralData: Partial<Referral>) => {
        const response = await api.post('/referrals', referralData);
        return response.data;
    },

    updateReferral: async (referralId: string, referralData: Partial<Referral>) => {
        const response = await api.patch(`/referrals/${referralId}`, referralData);
        return response.data;
    },

    deleteReferral: async (referralId: string) => {
        const response = await api.delete(`/referrals/${referralId}`);
        return response.data;
    }
};

export default referralService; 