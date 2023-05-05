<script setup lang="ts">
import { IconEdit } from "@tabler/icons-vue";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (event: "update:visible", visible: boolean): void;
}>();

const { visible } = useVModels(props, emit);
const menu = useMenuStore();
const store = useUserStore();
</script>

<template>
  <ElCollapseTransition>
    <div v-if="visible">
      <ul class="flex flex-wrap items-center gap-4 px-3 py-2">
        <li v-for="item in menu.menus" :key="item.id">
          <a
            :href="item.url"
            :title="item.title"
            class="rounded-md px-3 py-2 transition hover:ring"
          >
            {{ item.title }}
          </a>
        </li>
        <li v-if="store.isLogin" class="flex items-center">
          <NuxtLink
            to="/navigation"
            class="rounded-md px-3 py-2 hover:ring"
            title="编辑"
            @click="visible = false"
          >
            <IconEdit :size="20" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ElCollapseTransition>
</template>

<style scoped></style>
