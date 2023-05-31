<script setup lang="ts">
import { IconEdit } from "@tabler/icons-vue";
import { NuxtLink } from "#components";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  visible: [visible: boolean];
}>();

const { visible } = useVModels(props, emit);
const menu = useMenuStore();
const store = useUserStore();
</script>

<template>
  <ElCollapseTransition>
    <div v-if="visible">
      <div class="flex flex-wrap items-center gap-y-3 px-3 py-2">
        <ElButton
          v-for="item in menu.menus"
          :key="item.id"
          text
          bg
          tag="a"
          :title="item.title"
          :href="item.url"
          target="_blank"
        >
          {{ item.title }}
        </ElButton>
        <ElButton
          v-if="store.isLogin"
          :tag="NuxtLink"
          text
          bg
          to="/navigation"
          title="编辑"
        >
          <IconEdit :size="20" />
        </ElButton>
      </div>
    </div>
  </ElCollapseTransition>
</template>

<style scoped></style>
