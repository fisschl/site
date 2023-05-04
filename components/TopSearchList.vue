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
  request<string[]>("/top-search-type")
);

const page = ref(1);
const formData = ref<Partial<TopSearchItem>>({});

const fetchData = () =>
  request<TopSearchResponse>("/top-search", {
    query: { page: page.value++, size: 20, ...formData.value },
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
const loadingVisible = useElementVisibility(() => loadingBox.value?.$el);
watch(loadingVisible, (visible) => {
  if (!visible) return;
  fetchData().then((res) => {
    data.value?.push(...res);
  });
});

watchDebounced(formData, refresh, { deep: true, debounce: 500 });
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
  <ElTimeline class="!mx-auto max-w-4xl !px-4">
    <ElTimelineItem
      v-for="item in data"
      :key="item.id"
      :timestamp="item.update_time"
    >
      <a
        class="hover:text-blue-500 hover:underline"
        :href="item.url"
        target="_blank"
      >
        {{ item.title }}
        <ElTag size="small" class="ml-2" type="info">
          {{ item.type }}
        </ElTag>
      </a>
    </ElTimelineItem>
  </ElTimeline>
  <ElSkeleton
    ref="loadingBox"
    class="mx-auto max-w-4xl px-4 pb-5"
    :rows="10"
    animated
  />
</template>

<style scoped></style>
