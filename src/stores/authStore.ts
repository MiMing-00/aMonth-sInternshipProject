import { create } from "zustand";

type LoginInfo = {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string;
  nickname: string;
};

export type UserInfo = {
  avatar: string | null;
  id: string;
  nickname: string;
  success: boolean;
};

type AuthStore = {
  initialLoginInfo: LoginInfo | null;
  saveInitialLoginInfo: (loginInfo: LoginInfo) => void;
  accessToken: string | null;
  setSessionToken: (token: string) => void;
  loadSessionToken: () => void;
  removeAccessToken: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  initialLoginInfo: null,
  saveInitialLoginInfo: (initialLoginInfo: LoginInfo) =>
    set(() => ({ initialLoginInfo })),

  accessToken: sessionStorage.getItem("accessToken"),
  setSessionToken: (token) => {
    sessionStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  loadSessionToken: () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) set({ accessToken: token });
  },
  removeAccessToken: () => {
    sessionStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
}));

export default useAuthStore;
