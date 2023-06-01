<script setup lang="ts">
import { IconArrowBigRight } from "@tabler/icons-vue";
import type { TopSearchResponse } from "./topsearch.vue";
import { NuxtLink } from "#components";

const { data } = useAsyncData(() =>
  request<TopSearchResponse>("/topsearch", {
    query: { page: 1, size: 10 },
  })
);
</script>

<template>
  <main>
    <section class="mx-auto my-10 max-w-4xl px-4">
      <img
        src="https://tenapi.cn/v2/bing"
        class="block rounded"
        alt="必应每日壁纸"
      />
    </section>
    <JinRiShiCi class="my-10" />
    <section class="mx-auto my-10 max-w-xl px-4">
      <ElCard v-if="data" class="">
        <ul class="ml-6 list-disc space-y-3 text-slate-400 marker:text-sky-400">
          <li v-for="item in data.list" :key="item.id">
            <a
              :href="item.url"
              target="_blank"
              class="text-sm hover:text-indigo-400 hover:underline"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
        <div class="flex justify-center">
          <ElButton text bg to="/topsearch" :tag="NuxtLink">
            热搜分析
            <ElIcon :size="20" class="ml-2">
              <IconArrowBigRight />
            </ElIcon>
          </ElButton>
        </div>
      </ElCard>
    </section>
  </main>
</template>
