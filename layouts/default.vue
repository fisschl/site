<script setup lang="ts">
import { IconApps } from "@tabler/icons-vue";
</script>

<template>
  <nav
    class="sticky top-3 z-10 m-3 flex items-center overflow-hidden rounded-lg bg-white/20 px-4 py-3 backdrop-blur dark:bg-black/20"
  >
    <h1 class="flex-1 text-center text-lg">大道之行也 天下为公</h1>
    <ElButton text round class="mr-2">
      <IconApps :size="22" />
    </ElButton>
  </nav>
  <main>
    <slot />
  </main>
</template>
