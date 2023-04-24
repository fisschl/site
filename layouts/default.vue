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

const header = ref<HTMLHeadElement | null>(null);

onClickOutside(header, () => {
  if (!isNavVisible.value) return;
  isNavVisible.value = false;
});
</script>

<template>
  <header ref="header" class="sticky top-0 z-20 p-3" style="height: 4.5rem">
    <nav class="nav rounded-lg bg-white/20 backdrop-blur dark:bg-black/20">
      <div style="height: 3rem" class="flex items-center py-1">
        <ElButton
          title="导航"
          text
          circle
          class="mx-2 !h-auto"
          @click="isNavVisible = !isNavVisible"
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
      </div>
      <ElCollapseTransition :duration="200">
        <ul
          v-if="isNavVisible"
          class="mx-6 flex flex-wrap items-center gap-4 pb-4 pt-2"
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
      </ElCollapseTransition>
    </nav>
  </header>

  <main>
    <slot />
  </main>
</template>

<style scoped>
.nav {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
}

:root.dark .nav {
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.2) inset;
}
</style>
