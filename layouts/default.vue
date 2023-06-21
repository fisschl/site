<script setup lang="ts">
import { IconMoodWink, IconMoon, IconSun, IconUserUp } from "@tabler/icons-vue";

const BackToTop = defineAsyncComponent(
  () => import("~/components/BackToTop.vue")
);
const AppMenu = defineAsyncComponent(() => import("~/components/AppMenu.vue"));
const PageFooter = defineAsyncComponent(
  () => import("~/components/PageFooter.vue")
);
const userStore = useHandleLogin();

const { changeTheme, isDark } = useTheme();
</script>

<template>
  <div>
    <ElConfigProvider>
      <nav class="flex h-12 items-center px-4">
        <h1 class="LXGWWenKai flex-1 text-lg font-medium">
          大道之行也 天下为公
        </h1>
        <ClientOnly>
          <ElButton text @click="changeTheme">
            <IconSun v-if="isDark" class="icon-sun" :size="20" />
            <IconMoon v-else class="icon-moon" :size="20" />
          </ElButton>
        </ClientOnly>
        <NuxtLink v-if="!userStore.user" to="/login">
          <ElButton text>
            <IconUserUp :size="20" />
          </ElButton>
        </NuxtLink>
        <NuxtLink v-else to="/user">
          <ElButton text>
            <IconMoodWink :size="20" class="mr-2" />
            {{ userStore.user.name }}
          </ElButton>
        </NuxtLink>
      </nav>
      <AppMenu />
      <slot></slot>
      <BackToTop />
      <PageFooter />
    </ElConfigProvider>
  </div>
</template>
