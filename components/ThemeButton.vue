<script setup lang="ts">
import { IconMoon, IconSun } from "@tabler/icons-vue";

declare global {
  interface Document {
    startViewTransition(callback: () => Promise<void>): {
      ready: Promise<void>;
    };
  }
}

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const changeTheme = async (e: MouseEvent) => {
  const change = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
    return nextTick();
  };
  if (!document.startViewTransition) return change();
  const x = e.clientX;
  const y = e.clientY;
  const endRadius = Math.hypot(innerWidth, innerHeight);
  await document.startViewTransition(change).ready;
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0 at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 500,
      easing: "ease-in",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};
</script>

<template>
  <ClientOnly>
    <ElButton text @click="changeTheme">
      <IconSun v-if="isDark" class="icon-sun" :size="20" />
      <IconMoon v-else class="icon-moon" :size="20" />
    </ElButton>
  </ClientOnly>
</template>
