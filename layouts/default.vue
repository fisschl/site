<script setup lang="ts">
import {
  IconApps,
  IconBrandGithub,
  IconMoon,
  IconSun,
  IconUserUp,
} from "@tabler/icons-vue";

const BackToTop = defineAsyncComponent(
  () => import("~/components/BackToTop.vue")
);
const NavCard = defineAsyncComponent(() => import("~/components/NavCard.vue"));
const PageFooter = defineAsyncComponent(
  () => import("~/components/PageFooter.vue")
);
const store = useHandleLogin();

const handleClickLogin = () =>
  store.isLogin ? (location.href = "https://github.com") : fetchLogin();

const isNavVisible = ref(false);
const route = useRoute();
watchEffect(() => {
  isNavVisible.value = route.path === "/";
});
const handleOpenNav = () => (isNavVisible.value = !isNavVisible.value);

const { changeTheme, isDark } = useTheme();
</script>

<template>
  <div>
    <ElConfigProvider>
      <nav class="relative flex items-center py-4">
        <ElButton title="导航" text class="mx-2" @click.stop="handleOpenNav">
          <IconApps :size="20" />
        </ElButton>
        <h1 class="flex-1 text-center text-base">大道之行也 天下为公</h1>
        <ClientOnly>
          <ElButton text @click="changeTheme">
            <IconSun v-if="isDark" class="icon-sun" :size="20" />
            <IconMoon v-else class="icon-moon" :size="20" />
          </ElButton>
        </ClientOnly>
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
      <slot></slot>
      <BackToTop />
      <PageFooter />
    </ElConfigProvider>
  </div>
</template>
