<script setup lang="ts">
import { IconApps, IconLogin } from "@tabler/icons-vue";
useFetchUser();
</script>

<template>
  <nav class="nav rounded-lg bg-white/20 py-1 backdrop-blur dark:bg-black/20">
    <ElButton text circle class="mx-2 !h-auto">
      <IconApps :size="22" />
    </ElButton>
    <h1 class="flex-1 text-center text-lg">大道之行也 天下为公</h1>
    <ElButton text circle class="mx-2 !h-auto" @click="fetchLogin">
      <IconLogin :size="22" />
    </ElButton>
  </nav>
  <main>
    <slot />
  </main>
</template>

<style scoped>
.nav {
  position: sticky;
  z-index: 20;
  top: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}
</style>
