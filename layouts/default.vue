<script setup lang="ts">
import {
  IconApps,
  IconBrandGithub,
  IconMoon,
  IconSun,
  IconUserUp,
} from "@tabler/icons-vue";

const store = useHandleLogin();

const handleClickLogin = () =>
  store.isLogin ? (location.href = "https://github.com") : fetchLogin();
const isNavVisible = ref(false);

const handleOpenNav = () => (isNavVisible.value = !isNavVisible.value);

const { changeTheme } = useTheme();
</script>

<template>
  <nav class="relative flex items-center py-4">
    <ElButton title="导航" text class="mx-2" @click.stop="handleOpenNav">
      <IconApps :size="20" />
    </ElButton>
    <h1 class="flex-1 text-center text-base">大道之行也 天下为公</h1>
    <ElButton text @click="changeTheme">
      <IconSun class="icon-sun" :size="20" />
      <IconMoon class="icon-moon" :size="20" />
    </ElButton>
    <ElButton
      text
      class="!ml-0 mr-2"
      :title="store.isLogin ? 'Github' : '登录'"
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

<style scoped>
.icon-sun,
:root.dark .icon-moon {
  display: none;
}
.icon-moon,
:root.dark .icon-sun {
  display: inline-block;
}
</style>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>
