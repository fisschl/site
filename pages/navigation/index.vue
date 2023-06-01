<script setup lang="ts">
import { IconPencil } from "@tabler/icons-vue";
import { NuxtLink } from "#components";

const menu = useMenuStore();
</script>

<template>
  <main>
    <ElBreadcrumb class="mx-4 mb-2 mt-3">
      <ElBreadcrumbItem to="/">首页</ElBreadcrumbItem>
      <ElBreadcrumbItem>导航管理</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div class="flex justify-end gap-2 px-4 py-2">
      <NuxtLink to="/navigation/edit">
        <ElButton type="primary" plain style="width: 5rem"> 新增 </ElButton>
      </NuxtLink>
    </div>
    <div class="mx-auto max-w-3xl overflow-x-auto px-2 pb-6">
      <ElTable style="min-width: 30rem" :data="menu.list">
        <ElTableColumn
          show-overflow-tooltip
          prop="title"
          width="180"
          label="标题"
        >
          <template #default="{ row }">
            <NuxtLink
              :to="`/navigation/edit?id=${row.id}`"
              class="flex items-center gap-1 hover:underline"
            >
              {{ row.title }}
              <IconPencil :size="16" />
            </NuxtLink>
          </template>
        </ElTableColumn>
        <ElTableColumn show-overflow-tooltip label="链接">
          <template #default="{ row }">
            <ElLink class="whitespace-nowrap" :href="row.url" target="_blank">
              {{ row.url }}
            </ElLink>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </main>
</template>
