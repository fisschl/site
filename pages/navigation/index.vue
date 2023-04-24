<script setup lang="ts">
const menu = useMenuStore();
</script>

<template>
  <ElBreadcrumb class="mx-4 mb-3">
    <ElBreadcrumbItem to="/">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem>导航管理</ElBreadcrumbItem>
  </ElBreadcrumb>
  <div class="flex justify-end gap-2 px-4 py-2">
    <NuxtLink to="/navigation/edit">
      <ElButton type="primary" plain style="width: 5rem"> 新增 </ElButton>
    </NuxtLink>
  </div>
  <div class="overflow-x-auto px-2 pb-6">
    <ElTable style="min-width: 50rem" :data="menu.menus">
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
          <i class="text-lg" :class="iconClass(row.icon)" />
        </template>
      </ElTableColumn>
      <ElTableColumn width="70" label="公开">
        <template #default="{ row }">
          <ElTag v-if="row.public">公开</ElTag>
          <ElTag v-else type="warning">私有</ElTag>
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
