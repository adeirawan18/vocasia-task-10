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
      set({ isLoading: true, error: null }); // Set isLoading ke true saat mulai
      const { data } = await getProfile(); // Pemanggilan API
      set({ profile: data, error: null }); // Simpan profil dan reset error
    } catch (error) {
      console.error("Failed to fetch profile:", error); // Logging untuk debugging
      set({
        error: error.response?.data?.message || "Gagal mengambil data profil.",
      }); // Simpan pesan error
    } finally {
      set({ isLoading: false }); // Set isLoading ke false
    }
  },
  reset: () => {
    set(initialState); // Reset state
  },
}));
