<script setup lang="ts">
export interface Origin {
  title: string;
  dynasty: string;
  author: string;
  content: string[];
}

export interface Data {
  content: string;
  origin: Origin;
}

declare global {
  interface Window {
    jinrishici: {
      load: (cb: (result: { data: Data }) => void) => void;
    };
  }
}

const jinrishici = ref<Data>();

onMounted(() => {
  window.jinrishici.load((res) => {
    jinrishici.value = res.data;
  });
});
</script>

<template>
  <article v-if="jinrishici" class="LXGWWenKai text-center">
    <h3 class="mb-2 text-lg font-medium">
      {{ jinrishici.origin.title }}
    </h3>
    <p class="mb-4 text-gray-400">
      {{ jinrishici.origin.dynasty }}
      {{ jinrishici.origin.author }}
    </p>
    <p v-for="p in jinrishici.origin.content" :key="p" class="text-lg">
      {{ p }}
    </p>
  </article>
</template>
