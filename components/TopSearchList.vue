<script setup lang="ts">
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
  request<string[]>("/topsearchtype")
);

const page = ref(1);
const formData = reactive<Partial<TopSearchItem>>({});

const fetchData = () =>
  request<TopSearchResponse>("/topsearch", {
    query: { page: page.value++, size: 20, ...formData },
  }).then((res) =>
    res.list.map((item) => {
      item.update_time = formatShowTime(item.update_time);
      return item;
    })
  );

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
  { debounce: 500 }
);
</script>

<template>
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
  </form>
  <ol class="mx-auto max-w-4xl px-4">
    <li
      v-for="item in data"
      :key="item.id"
      class="my-2 rounded bg-gray-500/10 px-3 py-2 transition hover:bg-gray-500/20"
      :timestamp="item.update_time"
    >
      <a :href="item.url" target="_blank" class="text-base hover:underline">
        {{ item.title }}
      </a>
      <p class="mt-1">
        <ElTag size="small" class="mr-2" type="success">
          {{ item.update_time }}
        </ElTag>
        <ElTag size="small">
          {{ item.type }}
        </ElTag>
      </p>
    </li>
  </ol>
  <ElSkeleton
    ref="loadingBox"
    class="mx-auto max-w-4xl px-4 pb-5"
    :rows="20"
    animated
  />
</template>

<style scoped></style>
