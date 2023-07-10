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
  request<string[]>("/top-search-type")
);

const page = ref(1);
const { data: formData, reset } = useDefaultRef<Partial<TopSearchItem>>({});
const dateRange = ref<[string, string]>(["", ""]);

const fetchData = () =>
  request<TopSearchResponse>("/top-search", {
    query: {
      page: page.value++,
      size: 60,
      ...formData.value,
      start_time: dateRange.value[0] || undefined,
      end_time: dateRange.value[1] || undefined,
    },
  }).then((res) => {
    return res.list.map((item) => {
      item.update_time = formatShowTime(item.update_time);
      return item;
    });
  });

const { refresh, data, pending } = useAsyncData(() => {
  page.value = 1;
  return fetchData();
});

const loadingBox = ref<HTMLLIElement>();
watch(useElementVisibility(loadingBox), async (visible) => {
  if (!visible) return;
  data.value?.push(...(await fetchData()));
});

watchDebounced(
  () => [formData.value, dateRange.value],
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
      class="mx-auto mb-4 mt-6 max-w-4xl flex flex-wrap justify-end gap-2 px-4"
    >
      <ElInput
        v-model="formData.title"
        placeholder="标题"
        clearable
        style="max-width: 20rem"
      />
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
      <ElDatePicker
        v-model="dateRange"
        type="daterange"
        value-format="YYYY-MM-DD"
        style="max-width: 17rem"
      />
      <ElButton bg text title="重置" @click="reset">
        <IconReload :size="18" />
      </ElButton>
    </form>
    <ElEmpty v-if="!pending && !data?.length" class="mb-80 mt-30" />
    <ol v-else class="mx-auto max-w-4xl list-none overflow-auto px-4">
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
      <li ref="loadingBox">
        <ElSkeleton class="" :rows="20" animated />
      </li>
    </ol>
  </main>
</template>

<style scoped></style>
