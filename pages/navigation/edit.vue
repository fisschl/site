<script setup lang="ts">
import { MenuItem, useMenuList } from "~/layouts/default.vue";

const editItem = ref<MenuItem>();
const route = useRoute();
const menuList = useMenuList();

watchEffect(() => {
  editItem.value = menuList.value.find((item) => item.id === route.query.id);
});
</script>

<template>
  <ElBreadcrumb class="mx-4 mb-3">
    <ElBreadcrumbItem to="/navigation">导航管理</ElBreadcrumbItem>
    <ElBreadcrumbItem>编辑</ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
