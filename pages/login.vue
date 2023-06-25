<script setup lang="ts">
import { IconFlare, IconSunrise } from "@tabler/icons-vue";
import type { FormRules } from "element-plus";
import { UserItem } from "~/composables/user";

const formData = reactive<Partial<UserItem>>({});
const userStore = useUserStore();

const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
});

const { form, validate } = useForm();
const activeTab = ref("登录");
const router = useRouter();
const login = async () => {
  await validate();
  return request("/login", {
    query: formData,
  })
    .then((res) => {
      localStorage.setItem("token", res.token);
      userStore.user = res.user;
      router.replace("/");
    })
    .catch(() => {
      ElMessage.warning("用户名或密码错误");
    });
};

const logon = async () => {
  await validate();
  return request("/logon", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      localStorage.setItem("token", res.token);
      userStore.user = res.user;
      router.replace("/");
    })
    .catch(() => {
      ElMessage.warning("用户名已存在");
    });
};
</script>

<template>
  <main class="mx-auto mt-10 max-w-xs p-3">
    <ElTabs v-model="activeTab" class="mb-10">
      <ElTabPane label="登录" name="登录" lazy>
        <ElForm
          ref="form"
          :model="formData"
          label-position="top"
          :rules="rules"
          class="mt-3"
          @submit.prevent="login"
        >
          <ElFormItem label="用户名" prop="name">
            <ElInput v-model="formData.name" placeholder="请输入用户名" />
          </ElFormItem>
          <ElFormItem label="密码" prop="password">
            <ElInput
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </ElFormItem>
          <ElButton native-type="submit" type="primary" class="mt-5 w-full">
            登录
            <IconFlare :size="18" class="ml-2" />
          </ElButton>
        </ElForm>
      </ElTabPane>
      <ElTabPane label="注册" name="注册" lazy>
        <ElForm
          ref="form"
          :model="formData"
          label-position="top"
          :rules="rules"
          class="mt-3"
          @submit.prevent="logon"
        >
          <ElFormItem label="用户名" prop="name">
            <ElInput v-model="formData.name" placeholder="请输入用户名" />
          </ElFormItem>
          <ElFormItem label="密码" prop="password">
            <ElInput
              v-model="formData.password"
              placeholder="请输入密码"
              type="password"
              show-password
            />
          </ElFormItem>
          <ElButton native-type="submit" type="primary" class="mt-5 w-full">
            注册
            <IconSunrise :size="18" class="ml-2" />
          </ElButton>
        </ElForm>
      </ElTabPane>
    </ElTabs>
  </main>
</template>
