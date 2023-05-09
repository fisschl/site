<script setup lang="ts">
import { MenuItem } from "~/composables/menu";

const formData = ref<Partial<MenuItem>>({});
const route = useRoute();
const menu = useMenuStore();
const router = useRouter();
const isCreate = computed(() => !route.query.id);

watchEffect(() => {
  if (isCreate.value) return;
  const value = menu.menus?.find((item) => item.id === route.query.id);
  if (!value) return router.replace("/navigation");
  value.sort ||= 0;
  formData.value = JSON.parse(JSON.stringify(value));
});

const rules = {
  title: [{ required: true, message: "请输入标题" }],
  url: [{ required: true, message: "请输入链接" }],
};

const { form, validate } = useForm();
const loading = ref(false);

const refresh = () =>
  menu
    .refresh()
    .then(() => router.replace("/navigation"))
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
    .then(refresh);

const update = () =>
  validate()
    .then(() => (loading.value = true))
    .then(() =>
      request("/navigation", {
        method: "PUT",
        body: formData.value,
      })
    )
    .then(refresh);

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
    .then(refresh);
</script>

<template>
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
      <ElInput v-model="formData.title" style="max-width: 20rem" />
    </ElFormItem>
    <ElFormItem prop="url" label="链接">
      <ElInput v-model="formData.url" style="max-width: 30rem" />
    </ElFormItem>
    <ElFormItem prop="sort" label="顺序">
      <ElInputNumber v-model="formData.sort" />
    </ElFormItem>
    <ElFormItem prop="visible" label="可见性">
      <ElSwitch
        v-model="formData.visible"
        active-text="可见"
        inactive-text="隐藏"
      />
    </ElFormItem>
    <ElFormItem prop="public" label="权限">
      <ElSwitch
        v-model="formData.public"
        active-text="公开"
        inactive-text="私有"
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
</template>
