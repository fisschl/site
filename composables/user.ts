import { ofetch } from "ofetch";
import { defineStore } from "pinia";

export interface UserItem {
  id: string;
  image: string;
  name: string;
  password: string;
  authority: string;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<UserItem>();

  return { user };
});

export const HOST = "https://fisschl.world/api";

export const request = ofetch.create({
  baseURL: HOST,
  onRequest({ options }) {
    if (typeof window === "undefined") return;
    options.headers ||= {};
    const headers: any = options.headers;
    headers.Authorization = localStorage.getItem("token");
  },
});

/**
 * 分页
 */
export interface Page {
  current: number; // 当前页码
  size: number; // 每页的记录数
  total?: number; // 总记录数
}

export const useHandleLogin = () => {
  const store = useUserStore();
  /**
   * 处理登录逻辑
   */
  onMounted(() => {
    request("/user").then((res) => {
      store.user = res;
    });
  });

  return store;
};
