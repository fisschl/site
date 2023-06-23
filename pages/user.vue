<script setup lang="ts">
import type { UserItem } from "~/composables/user";

const userStore = useUserStore();

const formData = reactive({
  ...userStore.user,
  password: undefined,
});

const submit = async (prop: keyof UserItem) => {
  const body: Partial<UserItem> = {};
  body[prop] = formData[prop];
  const res = await request("/user", {
    method: "PUT",
    body,
  });
  ElMessage.success("修改成功");
  userStore.user = res;
};
</script>

<template>
  <main class="mx-4 mb-10 mt-5">
    <ElCollapse>
      <ElCollapseItem title="修改用户名">
        <div class="mt-3 flex">
          <ElInput
            v-model="formData.name"
            placeholder="请输入用户名"
            class="mr-2 max-w-xs"
          />
          <ElButton native-type="submit" type="primary" @click="submit('name')">
            确认
          </ElButton>
        </div>
      </ElCollapseItem>
      <ElCollapseItem title="修改密码">
        <div class="mt-3 flex">
          <ElInput
            v-model="formData.password"
            placeholder="请输入新密码"
            class="mr-2 max-w-xs"
            type="password"
            show-password
          />
          <ElButton
            native-type="submit"
            type="primary"
            @click="submit('password')"
          >
            确认
          </ElButton>
        </div>
      </ElCollapseItem>
    </ElCollapse>
  </main>
</template>

<style scoped></style>
