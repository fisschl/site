<script setup lang="ts">
import { IconApps, IconBrandGithub, IconUserUp } from "@tabler/icons-vue";

const store = useFetchUser();
const handleClickLogin = () =>
  store.isLogin ? (location.href = "https://github.com") : fetchLogin();
const isNavVisible = ref(false);

const handleOpenNav = () => (isNavVisible.value = !isNavVisible.value);
</script>

<template>
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
    <slot />
  </main>
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
