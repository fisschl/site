<script setup lang="ts">
const id = "#jinrishici-script";
onMounted(() => {
  const ele = document.querySelector(id);
  if (ele) ele.remove();
  const script = document.createElement("script");
  script.src = "https://sdk.jinrishici.com/v2/browser/jinrishici.js";
  script.id = id;
  document.body.appendChild(script);
});
</script>

<template>
  <p class="jinrishici-sentence mb-4 mt-2 text-center"></p>
</template>
