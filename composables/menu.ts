import { defineStore } from "pinia";

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  visible: boolean;
  public: boolean;
  icon: string;
  sort: number;
}

export const useMenuStore = defineStore("menu", () => {
  const menus = ref<MenuItem[]>([]);
  const user = useUserStore();
  const fetchMenuList = () =>
    request<MenuItem[]>("/navigation").then((res) => {
      menus.value = res;
    });
  const { refresh } = useLazyAsyncData(fetchMenuList, {
    watch: [() => user.isLogin],
  });
  return {
    menus,
    refresh,
  };
});
