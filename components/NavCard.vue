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
      <ul class="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2">
        <li v-for="item in menu.menus" :key="item.id">
          <ElButton
            text
            bg
            tag="a"
            :title="item.title"
            :href="item.url"
            target="_blank"
          >
            {{ item.title }}
          </ElButton>
        </li>
        <li v-if="store.isLogin" class="flex items-center">
          <ElButton :tag="NuxtLink" text bg to="/navigation" title="编辑">
            <IconEdit :size="20" />
          </ElButton>
        </li>
      </ul>
    </div>
  </ElCollapseTransition>
</template>

<style scoped></style>
