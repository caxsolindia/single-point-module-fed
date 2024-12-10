import { create } from "zustand";

// Define the state and action types
interface SnackbarState {
  message: string;
  open: boolean;
  setMessage: (message: string) => void;
  clearMessage: () => void;
}

// Create the Zustand store with proper typing
export const useSnackbarStore = create<SnackbarState>((set) => ({
  message: "",
  open: false,
  setMessage: (message: string) => set({ message, open: true }),
  clearMessage: () => set({ message: "", open: false }),
}));
