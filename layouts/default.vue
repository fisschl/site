<script setup lang="ts">
import {
  IconApps,
  IconBrandGithub,
  IconEdit,
  IconUserUp,
} from "@tabler/icons-vue";

const store = useFetchUser();
const handleClickLogin = () => {
  store.isLogin ? window.open("https://github.com") : fetchLogin();
};
const isNavVisible = ref(false);
const menu = useMenuStore();

const navList = ref<HTMLElement | null>(null);
onClickOutside(navList, () => (isNavVisible.value = false), { capture: false });
const handleOpenNav = () => (isNavVisible.value = true);
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
  <Transition name="el-fade-in">
    <ul
      v-if="isNavVisible"
      ref="navList"
      class="nav nav-list fixed m-3 flex flex-wrap items-center gap-4 rounded-lg p-3"
    >
      <li v-for="item in menu.menus" :key="item.id">
        <a
          :href="item.url"
          :title="item.title"
          class="rounded-md px-3 py-1 transition hover:ring"
        >
          {{ item.title }}
        </a>
      </li>
      <li v-if="store.isLogin" class="flex items-center">
        <NuxtLink
          to="/navigation"
          class="rounded-md px-3 py-1 hover:ring"
          title="编辑"
          @click="isNavVisible = false"
        >
          <IconEdit :size="20" />
        </NuxtLink>
      </li>
    </ul>
  </Transition>
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

.nav-list {
  top: 4rem;
  z-index: 10;
}
</style>
