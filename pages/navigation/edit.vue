<script setup lang="ts">
import { MenuItem } from "~/composables/menu";

const formData = ref<Partial<MenuItem>>({});
const route = useRoute();
const menu = useMenuStore();
const router = useRouter();
const isCreate = computed(() => !route.query.id);

watch(
  () => menu.list,
  () => {
    if (isCreate.value) return;
    const value = menu.list?.find((item) => item.id === route.query.id);
    if (!value) return router.replace("/navigation");
    formData.value = JSON.parse(JSON.stringify(value));
  },
  { immediate: true }
);

const rules = {
  title: [{ required: true, message: "请输入标题" }],
  url: [{ required: true, message: "请输入链接" }],
};

const { form, validate } = useForm();
const loading = ref(false);

const handleReturn = () =>
  getNavigation()
    .then((res) => {
      menu.list = res;
      router.replace("/navigation");
    })
    .finally(() => (loading.value = false));

const create = () =>
  validate()
    .then(() => (loading.value = true))
    .then(() =>
      request("/navigation", {
        method: "POST",
        body: formData.value,
      })
    )
    .then(handleReturn);

const update = () =>
  validate()
    .then(() => (loading.value = true))
    .then(() =>
      request("/navigation", {
        method: "PUT",
        body: formData.value,
      })
    )
    .then(handleReturn);

const remove = () =>
  ElMessageBox.confirm("此操作将永久删除该条目, 是否继续?", {
    type: "error",
  })
    .then(() => (loading.value = true))
    .then(() =>
      request("/navigation", {
        method: "DELETE",
        query: { id: route.query.id },
      })
    )
    .then(handleReturn);
</script>

<template>
  <main>
    <ElBreadcrumb class="mx-4 mb-10 mt-3">
      <ElBreadcrumbItem to="/">首页</ElBreadcrumbItem>
      <ElBreadcrumbItem to="/navigation">导航管理</ElBreadcrumbItem>
      <ElBreadcrumbItem>编辑</ElBreadcrumbItem>
    </ElBreadcrumb>
    <ElForm
      ref="form"
      :rules="rules"
      class="mx-auto my-6 max-w-lg px-4 pb-6"
      :model="formData"
      label-position="top"
    >
      <ElFormItem prop="title" label="标题">
        <ElInput
          v-model="formData.title"
          style="max-width: 20rem"
          @change="formData.title = formData.title?.trim()"
        />
      </ElFormItem>
      <ElFormItem prop="url" label="链接">
        <ElInput
          v-model="formData.url"
          style="max-width: 30rem"
          @change="formData.url = formData.url?.trim()"
        />
      </ElFormItem>
      <ElFormItem class="mt-6">
        <ElButton
          style="width: 8rem"
          type="primary"
          plain
          :loading="loading"
          @click="isCreate ? create() : update()"
        >
          {{ isCreate ? "创建" : "更新" }}
        </ElButton>
        <ElButton
          v-if="!isCreate"
          :loading="loading"
          text
          type="danger"
          @click="remove"
        >
          删除
        </ElButton>
      </ElFormItem>
    </ElForm>
  </main>
</template>
