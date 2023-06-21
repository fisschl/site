<script setup lang="ts">
const imgList = [
  "https://api.paugram.com/wallpaper",
  "https://api.btstu.cn/sjbz/api.php?lx=dongman",
  "https://img.xjh.me/random_img.php?return=302",
];
</script>

<template>
  <main class="relative p-10">
    <img
      v-for="img in imgList"
      :key="img"
      :src="img"
      alt="随机图片"
      class="my-3 rounded shadow"
    />
  </main>
</template>
