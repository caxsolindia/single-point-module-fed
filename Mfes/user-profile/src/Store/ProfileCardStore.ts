import { create } from "zustand";

interface ProfileCardStore {
  isModalOpen: boolean;
  isDrawerOpen: boolean;
  drawerId: string | null; // State to track the specific drawer ID
  modalId: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
  openDrawer: (id: string) => void; // Only accept ID parameter
  closeDrawer: () => void;
}

export const useProfileCardStore = create<ProfileCardStore>((set) => ({
  isModalOpen: false,
  isDrawerOpen: false,
  drawerId: null, // Initialize with null
  modalId: null,

  openModal: (id: string) => set({ isModalOpen: true, modalId: id }),
  closeModal: () => set({ isModalOpen: false, modalId: null }),
  openDrawer: (id: string) => set({ isDrawerOpen: true, drawerId: id }), // Set drawerId
  closeDrawer: () => set({ isDrawerOpen: false, drawerId: null }), // Reset drawerId
}));
