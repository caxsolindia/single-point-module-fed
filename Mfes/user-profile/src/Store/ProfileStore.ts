import { create } from "zustand";

interface ProfileState {
  editModes: { [key: string]: boolean };
  drawerModes: { [key: string]: boolean }; // Manage drawer open/close states
  contactNumber: string;
  contactError: string;
  expandedCardIds: string[]; // Manage expanded card IDs
  setEditMode: (cardId: string, editMode: boolean) => void;
  setDrawerMode: (cardId: string, drawerMode: boolean) => void;
  setContactNumber: (contactNumber: string) => void;
  setContactError: (contactError: string) => void;
  toggleCardExpansion: (cardId: string) => void; // Toggle card expansion
}

export const useProfileStore = create<ProfileState>((set) => ({
  editModes: {},
  drawerModes: {}, // Initialize as an empty object
  contactNumber: "",
  contactError: "",
  expandedCardIds: [], // Initialize as an empty array
  setEditMode: (cardId, editMode) =>
    set((state) => ({
      editModes: { ...state.editModes, [cardId]: editMode },
    })),
  setDrawerMode: (cardId, drawerMode) =>
    set((state) => ({
      drawerModes: { ...state.drawerModes, [cardId]: drawerMode },
    })),
  setContactNumber: (contactNumber) => set({ contactNumber }),
  setContactError: (contactError) => set({ contactError }),
  toggleCardExpansion: (cardId) =>
    set((state) => ({
      expandedCardIds: state.expandedCardIds.includes(cardId)
        ? state.expandedCardIds.filter((id) => id !== cardId)
        : [...state.expandedCardIds, cardId],
    })),
}));
