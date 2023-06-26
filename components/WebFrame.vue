<script setup lang="ts">
defineProps<{
  src: string;
  fullscreen: boolean;
}>();
</script>
<template>
  <iframe
    :src="src"
    class="m-0 block border-none p-0 outline-none"
    :class="{
      'h-screen w-screen': fullscreen,
    }"
    allow="geolocation; microphone; camera; midi; accelerometer; gyroscope; payment; encrypted-media; usb; autoplay; clipboard-write; clipboard-read;"
  ></iframe>
</template>
