import { create } from "zustand";

export interface UserCertificate {
  certificateExpiryDate?: string | null;
  certificateID?: string | null | undefined;
  certificateImageURL?: string | null;
  certificateIssueDate?: string | null;
  certificateName?: string | null;
  certificateURL?: string | null;
  organizationName?: string | null;
  skillId?: string | null;
  skill: string | null;
  file: string | null;
}
export type SelectedCertificate = UserCertificate & {
  startMonth?: string | undefined;
  startYear?: NonNullable<string | number | undefined>;
  endMonth?: string | undefined;
  endYear?: string | number | undefined;
};
interface UserCertificateState {
  userCertificate: (UserCertificate | null)[] | null | undefined;
  idSelected: string;
  setUserCertificate: (
    updatedValue: (UserCertificate | null)[] | undefined | null,
  ) => Promise<void>;

  deleteUserCertificate: (CertificateId: string) => Promise<void>;
  setIdSelected: (CertificateId: string) => void;
}

export const useUserCertificateStore = create<UserCertificateState>((set) => ({
  userCertificate: [],
  idSelected: "",
  setIdSelected: (CertificateId) => set({ idSelected: CertificateId }),
  setUserCertificate: async (
    updatedValue: (UserCertificate | null)[] | null | undefined,
  ) => {
    set((state) => ({
      userCertificate: [
        ...(Array.isArray(updatedValue) ? updatedValue : [updatedValue]), // Handle both arrays and single values
        ...(state.userCertificate ?? []),
      ].filter(
        (Certificate): Certificate is UserCertificate | null =>
          Certificate !== undefined,
      ), // Filter out undefined values
    }));
  },
  deleteUserCertificate: async (CertificateId) => {
    set((state) => ({
      userCertificate: state.userCertificate?.filter(
        (Certificate) =>
          Certificate !== undefined &&
          Certificate?.certificateID !== CertificateId,
      ),
    }));
  },
}));
