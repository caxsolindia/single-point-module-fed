import { create } from "zustand";

export interface Project {
  userId?: string | null;
  projectId?: string | null;
  projectTitle?: string | null;
  role?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  projectSummary?: string | null;
  userSkills?: Array<string | null> | null;
}

interface UserProjectState {
  userProject: (Project | null)[] | null | undefined;
  projectIdSelected: string;
  setProjectIdSelected: (projectId: string) => void;
  setUserProject: (
    updatedValue: (Project | null)[] | undefined | null,
  ) => Promise<void>;
  deleteUserProject: (projectId: string) => Promise<void>;
}

export const useUserProjectStore = create<UserProjectState>((set) => ({
  userProject: [],
  projectIdSelected: "",
  setProjectIdSelected: (projectId) => set({ projectIdSelected: projectId }),
  setUserProject: async (
    updatedValue: (Project | null)[] | null | undefined,
  ) => {
    set((state) => ({
      userProject: [
        ...(Array.isArray(updatedValue) ? updatedValue : [updatedValue]),
        ...(state.userProject ?? []),
      ].filter((project): project is Project | null => project !== undefined),
    }));
  },
  deleteUserProject: async (projectId) => {
    set((state) => ({
      userProject: state.userProject?.filter(
        (project) => project !== undefined && project?.projectId !== projectId,
      ),
    }));
  },
}));
