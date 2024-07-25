import { create } from 'zustand'

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  resetUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) =>{
    set({ user })},
    resetUser: () => {
    set({ user: null })},
}));