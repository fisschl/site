<script setup lang="ts">
import { IconEdit } from "@tabler/icons-vue";
import { NuxtLink } from "#components";
import type { MenuItem } from "~/composables/menu";
import { request } from "~/composables/user";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  visible: [visible: boolean];
}>();

const { visible } = useVModels(props, emit);
const user = useUserStore();
const menu = useMenuStore();
watch(
  () => user.isLogin,
  () => getNavigation().then((res) => (menu.list = res))
);

const handleGoTo = async (item: MenuItem) => {
  await request("/navigation/visit", {
    method: "POST",
    query: { id: item.id },
  });
  location.href = item.url;
};
</script>

<template>
  <ElCollapseTransition>
    <div v-if="visible">
      <div class="link-list flex flex-wrap items-center gap-3 px-3 py-2">
        <ElButton
          v-for="item in menu.list"
          :key="item.id"
          text
          bg
          tag="a"
          :title="item.title"
          :href="item.url"
          target="_blank"
          @click.prevent="handleGoTo(item)"
        >
          {{ item.title }}
        </ElButton>
        <ElButton
          v-if="user.isLogin"
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

<style scoped>
.link-list a {
  margin: 0;
}
</style>
