<script setup lang="ts">
import type { FormInstance } from "element-plus";
import {
  MenuItem,
  iconClass,
  refreshMenuList,
  useMenuList,
} from "~/layouts/default.vue";

const item = ref<Partial<MenuItem>>({});

const route = useRoute();
const menuList = useMenuList();
const router = useRouter();
const isCreate = computed(() => !route.query.id);

watchEffect(() => {
  if (isCreate.value) return;
  const value = menuList.value.find((item) => item.id === route.query.id);
  if (!value) return router.replace("/navigation");
  value.sort ||= 0;
  item.value = JSON.parse(JSON.stringify(value));
});

const rules = {
  title: [{ required: true, message: "请输入标题" }],
  url: [{ required: true, message: "请输入链接" }],
  icon: [{ required: true, message: "请输入图标" }],
};

const form = ref<FormInstance>();

const check = () =>
  form.value?.validate((ok) => {
    if (!ok) throw new Error("表单校验失败");
  });

const refreshReturn = () => {
  refreshMenuList.value();
  return router.replace("/navigation");
};

const create = () =>
  check()
    ?.then(() =>
      request("/navigation", {
        method: "POST",
        body: item.value,
      })
    )
    .then(refreshReturn);

const update = () =>
  check()
    ?.then(() =>
      request("/navigation", {
        method: "PUT",
        body: item.value,
      })
    )
    .then(refreshReturn);

const remove = () =>
  check()
    ?.then(() =>
      request("/navigation", {
        method: "DELETE",
        query: { id: route.query.id },
      })
    )
    .then(refreshReturn);
</script>

<template>
  <ElBreadcrumb class="mx-4 mb-6">
    <ElBreadcrumbItem to="/">首页</ElBreadcrumbItem>
    <ElBreadcrumbItem to="/navigation">导航管理</ElBreadcrumbItem>
    <ElBreadcrumbItem>编辑</ElBreadcrumbItem>
  </ElBreadcrumb>
  <ElForm ref="form" :rules="rules" class="mx-4 my-6 pb-6" :model="item">
    <ElFormItem prop="title" label="标题">
      <ElInput v-model="item.title" style="max-width: 20rem" />
    </ElFormItem>
    <ElFormItem prop="url" label="链接">
      <ElInput v-model="item.url" style="max-width: 30rem" />
    </ElFormItem>
    <ClientOnly>
      <ElFormItem prop="sort" label="顺序">
        <ElInputNumber v-model="item.sort" />
      </ElFormItem>
    </ClientOnly>
    <ElFormItem prop="visible" label="可见性">
      <ElSwitch
        v-model="item.visible"
        active-text="可见"
        inactive-text="隐藏"
      />
    </ElFormItem>
    <ElFormItem prop="icon" label="图标">
      <ElInput v-model="item.icon" style="max-width: 15rem">
        <template #suffix>
          <i class="ml-2 text-xl" :class="iconClass(item.icon)" />
        </template>
      </ElInput>
    </ElFormItem>
    <ElFormItem prop="public" label="权限">
      <ElSwitch v-model="item.public" active-text="公开" inactive-text="私有" />
    </ElFormItem>
    <ElFormItem>
      <ElButton
        style="width: 8rem"
        type="primary"
        plain
        @click="isCreate ? create() : update()"
      >
        {{ isCreate ? "创建" : "更新" }}
      </ElButton>
      <ElButton v-if="!isCreate" text type="danger" @click="remove">
        删除
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
