<script setup lang="ts">
import { random } from "lodash-es";

declare global {
  interface Window {
    confetti: any;
  }
}

const data = useLocalStorage("muyu-data", {
  count: 0,
});

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const party = async () => {
  for (let i = 0; i < 3; i++) {
    window.confetti({
      spread: 360,
      particleCount: 150,
      origin: { x: random(0.1, 0.9), y: random(0.1, 0.9) },
    });
    await wait(100);
  }
};

const handleClick = () => {
  data.value.count++;
  if (data.value.count % 10 === 0) party();
};
</script>

<template>
  <main>
    <p class="LXGWWenKai mx-auto my-10 px-4 text-center">
      <span class="mx-2"> 敲电子木鱼 </span>
      <span class="mx-2"> 见机甲佛祖 </span>
      <span class="mx-2"> 涨赛博功德 </span>
    </p>
    <ElStatistic class="mx-auto text-center" title="功德" :value="data.count" />
    <div class="mx-auto my-10 max-w-xs p-4">
      <img
        src="@/assets/木鱼.svg"
        alt="木鱼"
        class="muyu w-full"
        @click="handleClick"
      />
    </div>
  </main>
</template>

<style scoped>
.muyu {
  cursor: pointer;
  transition: all 0.1s ease-out;
}

.muyu:active {
  transform: scale(0.95);
}
</style>
