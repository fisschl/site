<script setup lang="ts">
import { formatDistanceToNowStrict, parseJSON } from "date-fns";
import zhCN from "date-fns/locale/zh-CN";
import { Page } from "~/composables/user";

interface TopSearchItem {
  id: string;
  title: string;
  url: string;
  type: string;
  update_time: string;
}

interface TopSearchRequest extends Partial<TopSearchItem>, Partial<Page> {}

interface TopSearchResponse extends Required<Page> {
  list: TopSearchItem[];
}

const fetchTopSearch = (data?: TopSearchRequest) =>
  request<TopSearchResponse>("/top-search", {
    query: data,
  });

const fetchTopSearchType = () => request<string[]>("/top-search-type");

const formatTime = (time: string) =>
  formatDistanceToNowStrict(parseJSON(time), {
    addSuffix: true,
    locale: zhCN,
  });
</script>

<template>
  <div></div>
</template>

<style scoped></style>
