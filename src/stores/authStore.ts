import { create } from "zustand";

type LoginInfo = {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string;
  nickname: string;
};

type UserInfo = {
  avatar: string | null;
  id: string;
  nickname: string;
  success: boolean;
};

type AuthStore = {
  loginInfo: LoginInfo | null;
  saveLoginInfo: (loginInfo: LoginInfo) => void;
  accessToken: string | null;
  setSessionToken: (token: string) => void;
  loadSessionToken: () => void;
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  loginInfo: null,
  saveLoginInfo: (loginInfo: LoginInfo) => set(() => ({ loginInfo })),

  accessToken: sessionStorage.getItem("accessToken"),
  setSessionToken: (token) => {
    sessionStorage.setItem("accessToken", token);
  },
  loadSessionToken: () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) set({ accessToken: token });
  },

  userInfo: null,
  setUserInfo: (userInfo: UserInfo) => set(() => ({ userInfo })),
}));

export default useAuthStore;
