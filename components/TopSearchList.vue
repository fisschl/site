<script setup lang="ts">
import { formatDistanceToNowStrict, parseJSON } from "date-fns";
import zhCN from "date-fns/locale/zh-CN";
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

const formatTime = (time: string) =>
  formatDistanceToNowStrict(parseJSON(time), {
    addSuffix: true,
    locale: zhCN,
  });

const { data: topSearchType } = useAsyncData(() =>
  request<string[]>("/top-search-type")
);

const page = ref(1);
const formData = ref<Partial<TopSearchItem>>({});

const fetchData = () =>
  request<TopSearchResponse>("/top-search", {
    query: { current: page.value++, size: 20, ...formData.value },
  }).then((res) =>
    res.list.map((item) => {
      item.update_time = formatTime(item.update_time);
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
  <form class="mb-4 mt-6 flex flex-wrap justify-end gap-2 px-4">
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
  <ElTimeline class="!mx-3">
    <ElTimelineItem
      v-for="item in data"
      :key="item.id"
      :timestamp="item.update_time"
    >
      <ElLink :href="item.url" target="_blank" rel="noopener noreferrer">
        {{ item.title }}
      </ElLink>
      <ElTag class="ml-2" type="info">
        {{ item.type }}
      </ElTag>
    </ElTimelineItem>
  </ElTimeline>
  <ElSkeleton ref="loadingBox" class="px-4 pb-5" :rows="10" animated />
</template>

<style scoped></style>
