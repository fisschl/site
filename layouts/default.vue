<script setup lang="ts">
import { IconApps, IconBrandGithub, IconUserUp } from "@tabler/icons-vue";
import type { UserItem } from "~/composables/user";

const store = useUserStore();

/**
 * 处理登录逻辑
 */
onMounted(async () => {
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
  try {
    store.user = {
      ...(await request<UserItem>("/user")),
      isLogin: true,
    };
  } catch (err) {
    localStorage.removeItem("token");
    store.user.isLogin = false;
  }
});

const handleClickLogin = () =>
  store.isLogin ? (location.href = "https://github.com") : fetchLogin();
const isNavVisible = ref(false);

const handleOpenNav = () => (isNavVisible.value = !isNavVisible.value);
</script>

<template>
  <nav class="relative flex items-center py-4">
    <ElButton title="导航" text class="mx-2" @click.stop="handleOpenNav">
      <IconApps :size="20" />
    </ElButton>
    <h1 class="flex-1 text-center text-base">大道之行也 天下为公</h1>
    <ElButton
      text
      :title="store.isLogin ? 'Github' : '登录'"
      class="mx-2"
      @click="handleClickLogin"
    >
      <IconUserUp v-if="!store.isLogin" :size="20" />
      <IconBrandGithub v-if="store.isLogin" :size="20" />
    </ElButton>
  </nav>
  <NavCard v-model:visible="isNavVisible" />
  <main>
    <slot></slot>
  </main>
  <ElBacktop :right="20" :bottom="20" />
</template>

<style scoped></style>
