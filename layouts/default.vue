<script setup lang="ts">
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const BackToTop = defineAsyncComponent(
  () => import("~/components/BackToTop.vue")
);
const PageFooter = defineAsyncComponent(
  () => import("~/components/PageFooter.vue")
);
const ThemeButton = defineAsyncComponent(
  () => import("~/components/ThemeButton.vue")
);
const UserMenu = defineAsyncComponent(
  () => import("~/components/UserMenu.vue")
);
</script>

<template>
  <div>
    <ElConfigProvider :locale="zhCn">
      <nav class="flex h-12 items-center px-4">
        <h1 class="LXGWWenKai flex-1 text-lg font-medium">
          大道之行也 天下为公
        </h1>
        <ClientOnly>
          <ThemeButton />
        </ClientOnly>
        <ClientOnly>
          <UserMenu />
        </ClientOnly>
      </nav>
      <AppMenu />
      <slot></slot>
      <BackToTop />
      <PageFooter />
    </ElConfigProvider>
  </div>
</template>
