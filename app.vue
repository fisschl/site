<script setup lang="ts">
import "dayjs/locale/zh-cn";
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>

<style>
:root.dark {
  color-scheme: dark;
}
</style>
