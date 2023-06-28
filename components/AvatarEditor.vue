<script setup lang="ts">
import type { CropperSelection } from "cropperjs";
import { uniqueId } from "lodash-es";

import("cropperjs");

const props = defineProps<{
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const modelValue = useVModel(props, "modelValue", emit);

const id = uniqueId("cropper-selection-");
const imageUrl = ref("");
const isSubmit = ref(true);

const handleSelectImg = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  const files = await new Promise<FileList | null>((resolve) => {
    input.onchange = () => resolve(input.files);
    input.click();
  });
  if (!files || !files.length) return;
  const file = files[0];
  const reader = new FileReader();
  const url = await new Promise<string | void>((resolve) => {
    reader.onload = () => {
      const res = reader.result;
      if (typeof res !== "string") return resolve();
      resolve(res);
    };
    reader.readAsDataURL(file);
  });
  if (!url) return;
  imageUrl.value = url;
  isSubmit.value = false;
};

const selection = ref<CropperSelection | null>(null);
const submit = async () => {
  const canvas = await selection.value?.$toCanvas();
  if (!canvas) return;
  const data = canvas.toDataURL();
  modelValue.value = data;
  emit("change", data);
  isSubmit.value = true;
};
</script>

<template>
  <div>
    <cropper-canvas
      v-if="imageUrl && !isSubmit"
      style="width: 200px; height: 200px"
    >
      <cropper-image :src="imageUrl" alt="Picture" />
      <cropper-shade hidden />
      <cropper-handle action="move" plain />
      <cropper-selection
        :id="id"
        ref="selection"
        movable
        resizable
        zoomable
        initial-coverage="0.6"
        aspect-ratio="1"
      >
        <cropper-grid role="grid" covered />
        <cropper-handle action="move" theme-color="transparent" />
        <cropper-handle action="ne-resize"></cropper-handle>
        <cropper-handle action="nw-resize"></cropper-handle>
        <cropper-handle action="se-resize"></cropper-handle>
        <cropper-handle action="sw-resize"></cropper-handle>
      </cropper-selection>
    </cropper-canvas>
    <div class="mt-2">
      <cropper-viewer
        v-if="imageUrl && !isSubmit"
        class="avatar-view"
        :selection="'#' + id"
      />
      <img
        v-if="isSubmit && modelValue"
        class="avatar-view"
        :src="modelValue"
        alt="avatar"
      />
      <ElButton @click="handleSelectImg"> 上传头像 </ElButton>
      <ElButton v-if="!isSubmit" type="primary" @click="submit">
        确定
      </ElButton>
    </div>
  </div>
</template>

<style scoped>
.avatar-view {
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  width: 3rem;
  margin-right: 1rem;
}
</style>
