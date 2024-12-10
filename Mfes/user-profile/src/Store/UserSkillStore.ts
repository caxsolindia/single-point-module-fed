import { create } from "zustand";

export interface UserSkill {
  userId: string | null;
  skillId: string | null;
  skillName: string;
  experienceInYears: string | null;
  skillCategory: string;
  proficiency: string;
  status: boolean;
}

interface UserSkillState {
  userSkill: (UserSkill | null)[] | null | undefined;
  setUserSkill: (
    updatedValue: (UserSkill | null)[] | undefined | null,
  ) => Promise<void>;

  updateUserSkill: (
    updatedSkill: (UserSkill | null)[] | undefined | null,
  ) => Promise<void>;

  deleteUserSkill: (skillId: string) => Promise<void>;
}

export const useUserSkillStore = create<UserSkillState>((set) => ({
  userSkill: [],
  setUserSkill: async (
    updatedValue: (UserSkill | null)[] | null | undefined,
  ) => {
    set((state) => ({
      userSkill: [
        ...(Array.isArray(updatedValue) ? updatedValue : [updatedValue]), // Handle both arrays and single values
        ...(state.userSkill ?? []),
      ].filter((skill): skill is UserSkill | null => skill !== undefined), // Filter out undefined values
    }));
  },
  updateUserSkill: async (updatedSkillArray) => {
    const updatedSkill = updatedSkillArray?.[0];

    if (updatedSkill?.skillId) {
      set((state) => {
        const updatedUserSkill =
          state.userSkill?.map((item) => {
            if (item?.skillId === updatedSkill.skillId) {
              return updatedSkill;
            }
            return item;
          }) || null;

        return {
          userSkill: updatedUserSkill,
        };
      });
    }
  },
  deleteUserSkill: async (skillId) => {
    set((state) => ({
      userSkill: state.userSkill?.filter(
        (skill) => skill !== undefined && skill?.skillId !== skillId,
      ),
    }));
  },
}));
