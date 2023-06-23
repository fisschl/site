<script setup lang="ts">
const BackToTop = defineAsyncComponent(
  () => import("~/components/BackToTop.vue")
);
const AppMenu = defineAsyncComponent(() => import("~/components/AppMenu.vue"));
const PageFooter = defineAsyncComponent(
  () => import("~/components/PageFooter.vue")
);
const ThemeButton = defineAsyncComponent(
  () => import("~/components/ThemeButton.vue")
);
const UserMenu = defineAsyncComponent(
  () => import("~/components/UserMenu.vue")
);

const userStore = useUserStore();
/**
 * 处理登录逻辑
 */
onMounted(async () => {
  const res = await request("/user");
  userStore.user = res;
});
</script>

<template>
  <div>
    <ElConfigProvider>
      <nav class="flex h-12 items-center px-4">
        <h1 class="LXGWWenKai flex-1 text-lg font-medium">
          大道之行也 天下为公
        </h1>
        <ThemeButton />
        <UserMenu />
      </nav>
      <AppMenu />
      <slot></slot>
      <BackToTop />
      <PageFooter />
    </ElConfigProvider>
  </div>
</template>
