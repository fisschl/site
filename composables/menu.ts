import { defineStore } from "pinia";

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  update_time: string;
}

export const useMenuStore = defineStore("menu", () => {
  const list = ref<MenuItem[]>([]);
  return {
    list,
  };
});

export const getNavigation = () => request<MenuItem[]>("/navigation");
