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
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  updateUserInfo: (
    newUserInfo: Partial<Pick<UserInfo, "nickname" | "avatar">>
  ) => void;
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

  // 탄스택 쿼리로 리팩토링
  userInfo: null,
  setUserInfo: (userInfo: UserInfo) => set(() => ({ userInfo })),
  updateUserInfo: (
    newUserInfo: Partial<Pick<UserInfo, "nickname" | "avatar">>
  ) =>
    set((state) => ({
      userInfo: state.userInfo
        ? { ...state.userInfo, ...newUserInfo }
        : state.userInfo,
    })),
}));

export default useAuthStore;
