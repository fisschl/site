import { defineStore } from "pinia";

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  visible: boolean;
  public: boolean;
  sort: number;
}

export const useMenuStore = defineStore("menu", () => {
  const user = useUserStore();
  const { refresh, data } = useAsyncData(
    () => request<MenuItem[]>("/navigation"),
    { watch: [() => user.isLogin] }
  );
  return {
    menus: data,
    refresh,
  };
});
