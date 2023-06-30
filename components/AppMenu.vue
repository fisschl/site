<script setup lang="ts">
import {
  Icon3dCubeSphere,
  IconBoxSeam,
  IconBrandOpenai,
  IconCloudSearch,
  IconHome,
} from "@tabler/icons-vue";

const MenuList = [
  {
    name: "主页",
    icon: IconHome,
    path: "/",
  },
  {
    name: "文件库",
    icon: IconBoxSeam,
    path: "https://store.fisschl.world",
  },
  {
    name: "热搜分析",
    icon: IconCloudSearch,
    path: "/top-search",
  },
  {
    name: "GPU",
    icon: Icon3dCubeSphere,
    path: "https://fisschl.world/gpu",
  },
  {
    name: "GPT",
    icon: IconBrandOpenai,
    path: "https://gpt.fisschl.world",
  },
];
</script>

<template>
  <ElMenu mode="horizontal" class="h-10" :default-active="$route.path">
    <ElMenuItem
      v-for="item in MenuList"
      :key="item.path"
      :index="item.path"
      class="!p-0"
    >
      <NuxtLink
        :to="item.path"
        class="flex h-full w-full items-center gap-2 px-4"
      >
        <component :is="item.icon" :size="20" />
        {{ item.name }}
      </NuxtLink>
    </ElMenuItem>
  </ElMenu>
</template>
