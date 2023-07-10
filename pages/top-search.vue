<script setup lang="ts">
import { debounce, omit, pick } from "lodash-es";
import type { Page } from "utils/page";

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

const page = reactive<Page>({
  page: 1,
  size: 20,
});

const formData = reactive<
  Partial<TopSearchItem> & {
    dateRange?: [string, string];
  }
>({});

const data = ref<TopSearchItem[]>();
const loading = ref(false);
const fetchData = debounce(() => {
  loading.value = true;
  const dateRange = formData.dateRange || [];
  return request<TopSearchResponse>("/top-search", {
    query: {
      ...pick(page, ["page", "size"]),
      ...omit(formData, ["dateRange"]),
      start_time: dateRange[0] || undefined,
      end_time: dateRange[1] || undefined,
    },
  })
    .then((res) => {
      page.total = res.total;
      data.value = res.list.map((item) => {
        item.update_time = formatShowTime(item.update_time);
        return item;
      });
    })
    .finally(() => {
      loading.value = false;
    });
}, 200);
fetchData();
watchDeep(formData, () => (page.page = 1));
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
        @change="fetchData"
      />
      <ElSelect
        v-model="formData.type"
        placeholder="类型"
        clearable
        style="max-width: 10rem"
        @change="fetchData"
      >
        <ElOption
          v-for="item in topSearchType"
          :key="item"
          :label="item"
          :value="item"
        />
      </ElSelect>
      <ElDatePicker
        v-model="formData.dateRange"
        type="daterange"
        value-format="YYYY-MM-DD"
        style="max-width: 17rem"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="fetchData"
      />
    </form>
    <ElTable
      v-loading="loading"
      class="mx-4 min-h-2xl !w-auto"
      :data="data || []"
    >
      <ElTableColumn label="标题" prop="title">
        <template #default="{ row }">
          <ElLink :href="row.url" target="_blank">
            {{ row.title }}
          </ElLink>
        </template>
      </ElTableColumn>
      <ElTableColumn label="类型" width="100" prop="type">
        <template #default="{ row }">
          <ElTag size="small">
            {{ row.type }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="更新时间" width="160" prop="update_time">
        <template #default="{ row }">
          <ElTag size="small" type="success">
            {{ row.update_time }}
          </ElTag>
        </template>
      </ElTableColumn>
    </ElTable>
    <div class="mb-8 mt-4 flex justify-center">
      <ElPagination
        v-model:current-page="page.page"
        v-model:page-size="page.size"
        class="mx-auto"
        :total="page.total || 0"
        :page-sizes="[20, 60, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @update:current-page="fetchData"
        @update:page-size="fetchData"
      />
    </div>
  </main>
</template>

<style scoped></style>
