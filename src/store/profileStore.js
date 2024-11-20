import { create } from "zustand";
import { getProfile } from "../network/network";

const initialState = {
  profile: null,
  error: null,
  isLoading: false,
};

export const useProfileStore = create((set) => ({
  ...initialState,
  getProfile: async () => {
    try {
      set({ isLoading: true, error: null }); 
      const { data } = await getProfile(); 
      set({ profile: data, error: null }); 
    } catch (error) {
      console.error("Failed to fetch profile:", error); 
      set({
        error: error.response?.data?.message || "Gagal mengambil data profil.",
      }); 
    } finally {
      set({ isLoading: false }); 
    }
  },
  reset: () => {
    set(initialState); 
  },
}));
