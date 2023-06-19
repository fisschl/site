<script setup lang="ts">
import { Icon3dCubeSphere } from "@tabler/icons-vue";
import {
  IconBoxSeam,
  IconBrandGithub,
  IconCloudSearch,
  IconHome,
  IconMoon,
  IconSun,
  IconUserUp,
} from "@tabler/icons-vue";

const BackToTop = defineAsyncComponent(
  () => import("~/components/BackToTop.vue")
);
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
        <ElButton text @click="handleClickLogin">
          <IconUserUp v-if="!store.isLogin" :size="20" />
          <IconBrandGithub v-if="store.isLogin" :size="20" />
        </ElButton>
      </nav>
      <ClientOnly>
        <ElMenu mode="horizontal" class="h-10" router>
          <ElMenuItem index="/">
            <IconHome :size="20" class="mr-2" />
            主页
          </ElMenuItem>
          <ElMenuItem index="/store">
            <IconBoxSeam :size="20" class="mr-2" />
            文件库
          </ElMenuItem>
          <ElMenuItem index="/topsearch">
            <IconCloudSearch :size="20" class="mr-2" />
            热搜分析
          </ElMenuItem>
          <ElMenuItem index="/3d">
            <Icon3dCubeSphere :size="20" class="mr-2" />
            GPU
          </ElMenuItem>
        </ElMenu>
      </ClientOnly>
      <slot></slot>
      <BackToTop />
      <PageFooter />
    </ElConfigProvider>
  </div>
</template>
