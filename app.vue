<script setup lang="ts">
import "./index.scss";

onMounted(() => {
  import("bootstrap");
});
</script>

<template>
  <main>
    <NuxtPage />
  </main>
</template>
