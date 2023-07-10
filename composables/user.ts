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
