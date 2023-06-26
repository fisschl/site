<script setup lang="ts">
import { IconReload } from "@tabler/icons-vue";
import type { ElSkeleton } from "element-plus";
import { Page } from "~/composables/user";

interface TopSearchItem {
  id: string;
  title: string;
  url: string;
  type: string;
  update_time: string;
}

interface TopSearchResponse extends Required<Page> {
  list: TopSearchItem[];
}

const { data: topSearchType } = useAsyncData(() =>
  request<string[]>("/top-search-type", {
    query: {
      cache: 60 * 60 * 24 * 7,
    },
  })
);

const page = ref(1);
const { data: formData, reset } = useDefaultRef<Partial<TopSearchItem>>({});

const fetchData = () =>
  request<TopSearchResponse>("/top-search", {
    query: {
      page: page.value++,
      size: 20,
      ...formData.value,
      cache: 60 * 60 * 24,
    },
  }).then((res) => {
    return res.list.map((item) => {
      item.update_time = formatShowTime(item.update_time);
      return item;
    });
  });

const { refresh, data } = useAsyncData(() => {
  page.value = 1;
  return fetchData();
});

const loadingBox = ref<InstanceType<typeof ElSkeleton> | null>(null);
watch(useElementVisibility(loadingBox), async (visible) => {
  if (!visible) return;
  data.value?.push(...(await fetchData()));
});

watchDebounced(
  formData,
  () => {
    data.value = [];
    return refresh();
  },
  { debounce: 500, deep: true }
);
</script>

<template>
  <main>
    <form
      class="mx-auto mb-4 mt-6 flex max-w-4xl flex-wrap justify-end gap-2 px-4"
    >
      <ElInput
        v-model="formData.title"
        placeholder="标题"
        clearable
        style="max-width: 20rem"
      />
      <ClientOnly>
        <ElSelect
          v-model="formData.type"
          placeholder="类型"
          clearable
          style="max-width: 10rem"
        >
          <ElOption
            v-for="item in topSearchType"
            :key="item"
            :label="item"
            :value="item"
          />
        </ElSelect>
      </ClientOnly>
      <ElButton bg text title="重置" @click="reset">
        <IconReload :size="18" />
      </ElButton>
    </form>
    <ol class="mx-auto max-w-4xl overflow-auto px-4">
      <li
        v-for="item in data"
        :key="item.id"
        class="my-3 rounded bg-gray-400/5 px-3 py-2 transition hover:bg-gray-400/10"
      >
        <a
          :href="item.url"
          target="_blank"
          class="mb-1 block text-base hover:text-indigo-400 hover:underline"
        >
          {{ item.title }}
        </a>
        <ElTag size="small" class="mr-2" type="success">
          {{ item.update_time }}
        </ElTag>
        <ElTag size="small">
          {{ item.type }}
        </ElTag>
      </li>
      <li>
        <ElSkeleton ref="loadingBox" class="" :rows="20" animated />
      </li>
    </ol>
  </main>
</template>

<style scoped></style>