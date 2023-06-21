<script setup lang="ts">
import {
  Icon3dCubeSphere,
  IconBoxSeam,
  IconCloudSearch,
  IconHome,
  IconPalette,
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
    <ElMenuItem index="/topsearch">
      <IconCloudSearch :size="20" class="mr-2" />
      热搜分析
    </ElMenuItem>
    <ElMenuItem index="/3d">
      <Icon3dCubeSphere :size="20" class="mr-2" />
      GPU
    </ElMenuItem>
    <ElMenuItem index="/img">
      <IconPalette :size="20" class="mr-2" />
      图片
    </ElMenuItem>
  </ElMenu>
</template>
