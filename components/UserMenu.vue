<script setup lang="ts">
import { IconMoodWink, IconUserUp } from "@tabler/icons-vue";

const userStore = useUserStore();
</script>

<template>
  <NuxtLink v-if="!userStore.user" to="/login">
    <ElButton text>
      <IconUserUp :size="20" />
    </ElButton>
  </NuxtLink>
  <ElDropdown v-else>
    <ElButton text>
      <IconMoodWink :size="20" class="mr-2" />
      {{ userStore.user.name }}
    </ElButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>个人中心</ElDropdownItem>
        <ElDropdownItem divided>退出登录</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
