import {create} from 'zustand';
import type {AdminPage} from '../lib/types';

type AuthPage = 'landing' | 'login' | 'register';

interface NavigationState {
    currentPage: AdminPage;
    currentAuthPage: AuthPage;
    setCurrentPage: (page: AdminPage) => void;
    setCurrentAuthPage: (page: AuthPage) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
    currentPage: 'control',
    currentAuthPage: 'landing',
    setCurrentPage: (page) => set({currentPage: page}),
    setCurrentAuthPage: (page) => set({currentAuthPage: page}),
}));