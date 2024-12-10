import { create } from "zustand";

interface UserDataState {
  userId: string | null;
  username: string | null;
  setUserId: (userId: string) => void;
  setUsername: (userId: string) => void;
  refreshUserData: () => void;
}
interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  profilephoto: string;
}
const getUserDataFromSessionStorage = (): UserData | null => {
  const userDataString = sessionStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};
export const useUserDataStore = create<UserDataState>((set) => {
  const userData = getUserDataFromSessionStorage();
  return {
    userId: userData?.id ? userData?.id : null,
    username: userData?.username ? userData?.username : null,
    setUserId: (userId) => set({ userId }),
    setUsername: (username) => set({ username }),
    refreshUserData: () => {
      const updatedUserData = getUserDataFromSessionStorage();
      if (updatedUserData) {
        set({ userId: updatedUserData.id, username: updatedUserData.username });
      }
    },
  };
});
