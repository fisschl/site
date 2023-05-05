<script setup lang="ts">
import { IconEdit } from "@tabler/icons-vue";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (event: "update:visible", visible: boolean): void;
}>();

const { visible } = useVModels(props, emit);
const navList = ref<HTMLElement | null>(null);
onClickOutside(navList, () => (visible.value = false), { capture: false });
const menu = useMenuStore();
const store = useUserStore();
</script>

<template>
  <Transition name="el-fade-in">
    <ul
      v-if="visible"
      ref="navList"
      class="nav-list fixed m-3 flex flex-wrap items-center gap-4 rounded-lg p-5"
    >
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
  </Transition>
</template>

<style scoped>
.nav-list {
  top: 3.5rem;
  z-index: 10;
}
</style>
