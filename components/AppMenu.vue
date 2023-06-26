<script setup lang="ts">
import {
  Icon3dCubeSphere,
  IconBoxSeam,
  IconBrandOpenai,
  IconCloudSearch,
  IconHome,
} from "@tabler/icons-vue";
</script>

<template>
  <ElMenu mode="horizontal" class="h-10" router>
    <ElMenuItem index="/">
      <IconHome :size="20" class="mr-2" />
      主页
    </ElMenuItem>
    <ElMenuItem index="/store">
      <IconBoxSeam :size="20" class="mr-2" />
      文件库
    </ElMenuItem>
    <ElMenuItem index="/top-search">
      <IconCloudSearch :size="20" class="mr-2" />
      热搜分析
    </ElMenuItem>
    <ElMenuItem index="/3d">
      <Icon3dCubeSphere :size="20" class="mr-2" />
      GPU
    </ElMenuItem>
    <ElMenuItem index="/gpt">
      <IconBrandOpenai :size="20" class="mr-2" />
      GPT
    </ElMenuItem>
  </ElMenu>
</template>
