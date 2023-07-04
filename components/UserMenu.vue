<script setup lang="ts">
import { IconMoodWink, IconUserUp } from "@tabler/icons-vue";
import { ElForm, ElFormItem, ElInput } from "element-plus";

const userStore = useUserStore();
const router = useRouter();

/**
 * 处理登录逻辑
 */
onMounted(() => {
  if (!localStorage.getItem("token")) return;
  return request("/user")
    .then((res) => {
      res.image ||= "";
      userStore.user = res;
    })
    .catch(() => {
      localStorage.removeItem("token");
      userStore.user = undefined;
    });
});

const isShowUserEdit = ref(false);

const formData = reactive({
  ...userStore.user,
});

const changeKey = new Set<keyof typeof formData>();
const setChangeKey = (key: keyof typeof formData) => changeKey.add(key);

const handleSubmitUserEdit = () => {
  if (!changeKey.size) return (isShowUserEdit.value = false);
  const body = Object.fromEntries(
    Array.from(changeKey).map((key) => [key, formData[key]])
  );
  return request("/user", {
    method: "PUT",
    body,
  }).then((res) => {
    userStore.user = res;
    ElMessage.success("修改成功");
  });
};

const handleCommand = async (command: string) => {
  switch (command) {
    case "修改个人信息":
      Object.assign(formData, userStore.user);
      changeKey.clear();
      isShowUserEdit.value = true;
      return;
    case "修改密码":
      return ElMessageBox({
        title: "修改密码",
        message: () =>
          h(
            ElForm,
            {
              labelPosition: "top",
              model: formData,
            },
            () =>
              h(
                ElFormItem,
                {
                  label: "新密码",
                  prop: "password",
                },
                () =>
                  h(ElInput, {
                    placeholder: "请输入新密码",
                    type: "password",
                    showPassword: true,
                    modelValue: formData.password,
                    "onUpdate:modelValue": (value: string) => {
                      formData.password = value;
                    },
                  })
              )
          ),
      })
        .then(() =>
          request("/user", {
            method: "PUT",
            body: { password: formData.password },
          })
        )
        .then(() => {
          ElMessage.success("修改成功");
        });
    case "退出登录":
      await request("/logout");
      localStorage.removeItem("token");
      userStore.user = undefined;
      return router.replace("/");
  }
};
</script>

<template>
  <NuxtLink v-if="!userStore.user" to="/login">
    <ElButton text>
      <IconUserUp :size="20" />
    </ElButton>
  </NuxtLink>
  <ElDropdown v-else @command="handleCommand">
    <ElButton text>
      <span class="mr-2">
        {{ userStore.user.name }}
      </span>
      <ElAvatar
        v-if="userStore.user?.image"
        :src="userStore.user?.image"
        size="small"
      />
      <IconMoodWink v-else :size="20" />
    </ElButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem command="修改个人信息"> 修改个人信息 </ElDropdownItem>
        <ElDropdownItem command="修改密码" divided> 修改密码 </ElDropdownItem>
        <ElDropdownItem command="退出登录">退出登录</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
  <ElDialog v-model="isShowUserEdit" width="500px" title="修改个人信息">
    <ElForm
      :model="formData"
      label-position="top"
      @submit.prevent="handleSubmitUserEdit"
    >
      <ElFormItem label="用户名" prop="name">
        <ElInput
          v-model="formData.name"
          placeholder="请输入用户名"
          @change="setChangeKey('name')"
        />
      </ElFormItem>
      <ElFormItem label="头像" prop="image">
        <AvatarEditor
          v-model="formData.image"
          @change="setChangeKey('image')"
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <ElButton @click="isShowUserEdit = false"> 取消 </ElButton>
      <ElButton type="primary" @click="handleSubmitUserEdit"> 确定 </ElButton>
    </template>
  </ElDialog>
</template>
