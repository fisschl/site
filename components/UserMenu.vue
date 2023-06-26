<script setup lang="ts">
import { IconMoodWink, IconUserUp } from "@tabler/icons-vue";
import { ElForm, ElFormItem, ElInput } from "element-plus";

const userStore = useUserStore();
const router = useRouter();

/**
 * 处理登录逻辑
 */
onMounted(async () => {
  const res = await request("/user");
  userStore.user = res;
});

const handleCommand = async (command: string) => {
  const formData = reactive({
    ...userStore.user,
    password: "",
  });
  switch (command) {
    case "修改个人信息": {
      const changeKey = new Set<keyof typeof formData>();
      const setChangeKey = (key: keyof typeof formData) => changeKey.add(key);
      return ElMessageBox({
        title: "修改个人信息",
        message: () =>
          h(
            ElForm,
            {
              model: formData,
              labelPosition: "top",
            },
            () => [
              h(
                ElFormItem,
                {
                  label: "用户名",
                  prop: "name",
                },
                () =>
                  h(ElInput, {
                    placeholder: "请输入用户名",
                    modelValue: formData.name,
                    "onUpdate:modelValue": (value: string) => {
                      formData.name = value;
                    },
                    onChange: () => setChangeKey("name"),
                  })
              ),
            ]
          ),
      })
        .then(() => {
          if (!changeKey.size) throw new Error("未修改");
          const body = Object.fromEntries(
            Array.from(changeKey).map((key) => [key, formData[key]])
          );
          return request("/user", {
            method: "PUT",
            body,
          });
        })
        .then(() => {
          ElMessage.success("修改成功");
        })
        .catch(() => {
          ElMessage.info("取消");
        });
    }
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
        })
        .catch(() => {
          ElMessage.info("取消");
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
      <IconMoodWink :size="20" class="mr-2" />
      {{ userStore.user.name }}
    </ElButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem command="修改个人信息"> 修改个人信息 </ElDropdownItem>
        <ElDropdownItem command="修改密码" divided> 修改密码 </ElDropdownItem>
        <ElDropdownItem command="退出登录">退出登录</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
