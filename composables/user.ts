import { ofetch } from "ofetch";

export interface UserItem {
  id: string;
  image: string;
  name: string;
  email: string;
  authority?: string;
}

export const useUserState = () =>
  useState<
    Partial<UserItem> & {
      isLogin: boolean;
    }
  >("user", () => ({
    isLogin: false,
  }));

export const useIsLogin = () => {
  const state = useUserState();
  return computed(() => state.value.isLogin);
};

export const HOST = "https://fisschl.world/api";
export const LOGIN_URL = HOST + "/login";
export const LOGOUT_URL = HOST + "/logout";

export const request = ofetch.create({
  baseURL: HOST,
  onRequest({ options }) {
    if (typeof window === "undefined") return;
    options.headers ||= {};
    const headers: any = options.headers;
    const token = localStorage.getItem("token");
    headers.Authorization = token;
  },
});

export const useFetchUser = () => {
  const user = useUserState();
  onMounted(() => {
    const data = localStorage.getItem("user-state");
    if (data) user.value = JSON.parse(data);
    const url = new URL(window.location.href);
    const params = url.searchParams;
    let token = params.get("token") || undefined;
    if (token) {
      params.delete("token");
      localStorage.setItem("token", token);
      history.replaceState({}, "", url);
    } else {
      token = localStorage.getItem("token") || undefined;
    }
    if (!token) return;
    return request<UserItem>("/user")
      .then((res) => {
        user.value = {
          ...user.value,
          ...res,
          isLogin: true,
        };
      })
      .catch(() => {
        localStorage.removeItem("token");
        user.value.isLogin = false;
      });
  });
  watch(
    () => user.value.isLogin,
    () => {
      localStorage.setItem("user-state", JSON.stringify(user.value));
    }
  );
  return user;
};

export const fetchLogin = () => {
  const url = new URL(LOGIN_URL);
  url.searchParams.set("from", window.location.href);
  window.location.href = url.toString();
};

/**
 * 分页
 */
export interface Page {
  current: number; // 当前页码
  size: number; // 每页的记录数
  total?: number; // 总记录数
}
