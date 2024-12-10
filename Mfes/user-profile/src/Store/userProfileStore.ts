import { create } from "zustand";
// import { GetProfileOverviewQuery } from "../gql/operations.ts";

type Maybe<T> = T | null;

export interface ProfileResponse {
  __typename?: "GetProfileOverviewResponse";
  status: boolean;
  message?: string | null;
  profile?: {
    __typename?: "ProfileOverviewResponse";
    userId?: string | null;
    name?: string | null;
    username?: string | null;
    phone?: string | null;
    address?: string | null;
    gender?: string | null;
    linkedinURL?: string | null;
    employeeId?: string | null;
    profilephoto?: string | null;
    languages?: Array<string | null> | null;
    managerName?: string | null;
  } | null;
}
export interface Profile {
  userId: Maybe<string>;
  name: Maybe<string>;
  username: Maybe<string>;
  phone: Maybe<string>;
  address: Maybe<string>;
  gender: Maybe<string>;
  linkedinURL: Maybe<string>;
  employeeId: Maybe<string>;
  profilephoto: Maybe<string>;
  languages: Maybe<Array<Maybe<string>>>;
  managerName: Maybe<string>;
}

interface ProfileStoreState {
  status: boolean;
  message: Maybe<string>;
  profile: Maybe<Profile>;
  loading: boolean;
  error: Maybe<string>;
  setProfileData: (data: ProfileResponse | undefined | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Maybe<string>) => void;
}

export const transformProfileData = (
  data: ProfileResponse | undefined | null,
): Maybe<Profile> => {
  if (!data?.profile) return null;
  const { profile } = data;
  return {
    userId: profile.userId ?? null,
    name: profile.name ?? null,
    username: profile.username ?? null,
    phone: profile.phone ?? null,
    address: profile.address ?? null,
    gender: profile.gender ?? null,
    linkedinURL: profile.linkedinURL ?? null,
    employeeId: profile.employeeId ?? null,
    profilephoto: profile.profilephoto ?? null,
    languages: profile.languages ?? null,
    managerName: profile.managerName ?? null,
  };
};

const useProfileStore = create<ProfileStoreState>((set) => ({
  status: false,
  message: null,
  profile: null,
  loading: false,
  error: null,

  setProfileData: (data: ProfileResponse | undefined | null) =>
    set({
      status: data?.status ?? false,
      message: data?.message ?? null,
      profile: transformProfileData(data),
      loading: false,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error, loading: false }),
}));

export default useProfileStore;
