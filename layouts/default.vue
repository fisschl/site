<script setup lang="ts">
import { IconApps, IconBrandGithub, IconUserUp } from "@tabler/icons-vue";
import type { UserItem } from "~/composables/user";

const store = useUserStore();
onMounted(() => {
  const data = localStorage.getItem("user-state");
  if (data) store.user = JSON.parse(data);
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
      store.user = {
        ...res,
        isLogin: true,
      };
    })
    .catch(() => {
      localStorage.removeItem("token");
      store.user.isLogin = false;
    });
});

const handleClickLogin = () =>
  store.isLogin ? (location.href = "https://github.com") : fetchLogin();
const isNavVisible = ref(false);

const handleOpenNav = () => (isNavVisible.value = !isNavVisible.value);

const colorMode = useColorMode();
const theme = computed(() => (colorMode.value === "dark" ? "dark" : "light"));
</script>

<template>
  <VanConfigProvider :theme="theme">
    <nav
      class="nav sticky top-3 z-10 m-3 flex items-center rounded-lg py-1"
      style="height: 3rem"
    >
      <ElButton
        title="导航"
        text
        circle
        class="mx-2 !h-auto"
        @click.stop="handleOpenNav"
      >
        <IconApps :size="20" />
      </ElButton>
      <h1 class="flex-1 text-center text-base">大道之行也 天下为公</h1>
      <ElButton
        text
        :title="store.isLogin ? 'Github' : '登录'"
        circle
        class="mx-2 !h-auto"
        @click="handleClickLogin"
      >
        <IconUserUp v-if="!store.isLogin" :size="20" />
        <IconBrandGithub v-if="store.isLogin" :size="20" />
      </ElButton>
    </nav>
    <NavCard v-model:visible="isNavVisible" class="nav" />
    <main>
      <slot></slot>
    </main>
  </VanConfigProvider>
</template>

<style scoped>
.nav {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

:root.dark .nav {
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.2) inset;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
