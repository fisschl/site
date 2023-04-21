<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import type { ElCarousel } from "element-plus";

const carousel = ref<InstanceType<typeof ElCarousel>>();
const { width } = useElementSize(() => carousel.value?.$el);

const controlData = [
  {
    url: "https://tenapi.cn/v2/bing",
  },
  {
    url: "https://tenapi.cn/v2/acg",
  },
];
</script>

<template>
  <div>
    <ElCarousel ref="carousel" :height="width * (9 / 16) + 'px'">
      <ElCarouselItem v-for="item in controlData" :key="item.url">
        <img :src="item.url" :alt="item.url" />
      </ElCarouselItem>
    </ElCarousel>
  </div>
</template>
