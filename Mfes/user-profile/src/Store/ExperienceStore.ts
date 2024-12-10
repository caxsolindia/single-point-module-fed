import { create } from "zustand";

export interface ExperienceResponse {
  __typename?: "CompanyResponse";
  id?: string | null | undefined;
  companyName?: string | null | undefined;
  designation?: string | null | undefined;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  country?: string | null | undefined;
  state?: string | null | undefined;
  locationType?: string | null | undefined;
  employmentType?: string | null | undefined;
  jobSummary?: string | null | undefined;
  skill?: Array<string | null> | null | undefined;
}

interface CompanyState {
  companyId: string | null;
  selectedExperience: ExperienceResponse | null;
  viewExperience: (ExperienceResponse | null)[] | null | undefined;
  setCompanyId: (id: string) => void;
  setSelectedExperience: (experience: ExperienceResponse | null) => void;
  setViewExperience: (
    updatedValue: (ExperienceResponse | null)[] | undefined | null,
  ) => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companyId: null,
  selectedExperience: null as ExperienceResponse | null,
  viewExperience: null,
  setCompanyId: (id: string) =>
    set((state) => {
      if (state.companyId !== id) {
        return { companyId: id };
      }
      return state;
    }),

  setSelectedExperience: (experience: ExperienceResponse | null) =>
    set((state) => {
      if (state.selectedExperience?.id !== experience?.id) {
        return { selectedExperience: experience };
      }
      return state;
    }),

  setViewExperience: async (updatedValue) => {
    set({ viewExperience: updatedValue ?? null });
  },
}));
