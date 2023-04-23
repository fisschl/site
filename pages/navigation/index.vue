<script setup lang="ts">
import { iconClass, useMenuList } from "~/layouts/default.vue";

const menuList = useMenuList();
</script>

<template>
  <ElBreadcrumb class="mx-4 mb-3">
    <ElBreadcrumbItem>导航管理</ElBreadcrumbItem>
  </ElBreadcrumb>
  <div class="overflow-x-auto p-2">
    <ElTable style="min-width: 50rem" :data="menuList">
      <ElTableColumn
        show-overflow-tooltip
        prop="title"
        width="200"
        label="标题"
      />
      <ElTableColumn show-overflow-tooltip label="链接">
        <template #default="{ row }">
          <ElLink class="whitespace-nowrap" :href="row.url" target="_blank">
            {{ row.url }}
          </ElLink>
        </template>
      </ElTableColumn>
      <ElTableColumn width="60" label="排序">
        <template #default="{ row }">
          {{ row.sort || 0 }}
        </template>
      </ElTableColumn>
      <ElTableColumn width="70" label="可见">
        <template #default="{ row }">
          <ElTag v-if="row.visible" type="success">可见</ElTag>
          <ElTag v-else type="danger">隐藏</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn width="60" label="图标">
        <template #default="{ row }">
          <i class="text-xl" :class="iconClass(row.icon)" />
        </template>
      </ElTableColumn>
      <ElTableColumn width="70" label="公开">
        <template #default="{ row }">
          <ElTag v-if="row.public">公开</ElTag>
          <ElTag v-else type="danger">私有</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn width="60" label="操作">
        <template #default="{ row }">
          <NuxtLink :to="`/navigation/edit?id=${row.id}`">
            <ElButton link type="primary" size="small"> 编辑 </ElButton>
          </NuxtLink>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
