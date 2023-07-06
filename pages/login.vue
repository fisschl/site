<script setup lang="ts">
import { IconFlare, IconSunrise } from "@tabler/icons-vue";
import type { FormRules } from "element-plus";
import { FunctionalComponent } from "nuxt/dist/app/compat/capi";
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
  formData.name = formData.name?.trim();
  formData.password = formData.password?.trim();
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
  formData.name = formData.name?.trim();
  formData.password = formData.password?.trim();
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

interface ReusableTemplateProps {
  buttonName: string;
  buttonAction: () => void;
  buttonIcon: FunctionalComponent;
}

const [DefineTemplate, ReuseTemplate] =
  createReusableTemplate<ReusableTemplateProps>();
</script>

<template>
  <main class="mx-auto mt-10 max-w-xs p-3">
    <DefineTemplate v-slot="{ buttonName, buttonAction, buttonIcon }">
      <ElForm
        ref="form"
        :model="formData"
        label-position="top"
        :rules="rules"
        class="mt-3"
        @submit.prevent="buttonAction"
      >
        <ElFormItem label="用户名" prop="name">
          <ElInput
            v-model="formData.name"
            name="name"
            placeholder="请输入用户名"
          />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput
            v-model="formData.password"
            type="password"
            name="password"
            placeholder="请输入密码"
            show-password
          />
        </ElFormItem>
        <ElButton
          native-type="submit"
          size="large"
          type="primary"
          class="mt-5 w-full"
        >
          {{ buttonName }}
          <component :is="buttonIcon" class="ml-2" />
        </ElButton>
      </ElForm>
    </DefineTemplate>
    <ElTabs v-model="activeTab" class="mb-10">
      <ElTabPane label="登录" name="登录" lazy>
        <ReuseTemplate
          v-bind="{
            buttonName: '登录',
            buttonAction: login,
            buttonIcon: () => h(IconFlare, { size: 20 }),
          }"
        />
      </ElTabPane>
      <ElTabPane label="注册" name="注册" lazy>
        <ReuseTemplate
          v-bind="{
            buttonName: '注册',
            buttonAction: logon,
            buttonIcon: () => h(IconSunrise, { size: 20 }),
          }"
        />
      </ElTabPane>
    </ElTabs>
  </main>
</template>
