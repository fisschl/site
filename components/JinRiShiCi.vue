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
    jinrishici: any;
  }
}

const jinrishici = ref<Data>();

const load = () => {
  window.jinrishici.load((res: { data: Data }) => {
    jinrishici.value = res.data;
  });
};

onMounted(() => {
  if (window.jinrishici) return load();
  const script = document.getElementById("jinrishici-script");
  script?.addEventListener("load", load);
});
</script>

<template>
  <article v-if="jinrishici" class="LXGWWenKai text-center">
    <h3 class="mb-3 text-xl font-medium">
      {{ jinrishici.origin.title }}
    </h3>
    <p class="mb-5 text-gray-400">
      {{ jinrishici.origin.dynasty }}
      {{ jinrishici.origin.author }}
    </p>
    <p v-for="p in jinrishici.origin.content" :key="p" class="m-3 text-lg">
      {{ p }}
    </p>
  </article>
</template>
