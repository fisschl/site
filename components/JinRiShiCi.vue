<script setup lang="ts">
const id = "jinrishici-script";
onMounted(() => {
  document.getElementById(id)?.remove();
  const script = document.createElement("script");
  script.src = "https://sdk.jinrishici.com/v2/browser/jinrishici.js";
  script.id = id;
  document.body.appendChild(script);
});
</script>

<template>
  <p class="jinrishici-sentence LXGWWenKai text-center text-xl"></p>
</template>
