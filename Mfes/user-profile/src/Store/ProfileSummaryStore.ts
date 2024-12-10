import { create } from "zustand";

interface ProfileSummaryState {
  profileSum: string | undefined;
  setProfileSum: (updatedValue: string | undefined) => Promise<void>;
}

export const useProfileSummaryStore = create<ProfileSummaryState>((set) => ({
  profileSum: undefined,
  setProfileSum: async (updatedValue) => {
    set({ profileSum: updatedValue });
  },
}));
