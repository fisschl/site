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
      token?: string;
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

export const useRequest: typeof useFetch = (request, opts) => {
  return useFetch(request, {
    baseURL: HOST,
    onRequest({ options }) {
      if (typeof window === "undefined") return;
      options.headers ||= {};
      const headers: any = options.headers;
      const token = localStorage.getItem("token");
      headers.Authorization = token;
    },
    ...opts,
  });
};

export const useFetchUser = () => {
  const user = useUserState();
  useRequest<UserItem>("/user", {
    server: false,
  }).then(({ data }) => {
    if (!data.value) return;
    user.value = {
      ...user.value,
      ...data.value,
      isLogin: true,
    };
  });
};

export const fetchLogin = () => {
  const url = new URL(LOGIN_URL);
  url.searchParams.set("from", window.location.href);
  window.location.href = url.toString();
};

export const fetchLogout = () => {
  UserState.value.token = undefined;
  UserState.value.isLogin = false;
  const url = new URL(LOGOUT_URL);
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
