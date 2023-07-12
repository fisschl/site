<script setup lang="ts">
const handleSpeechRecognition = () => {
  const SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    return ElMessage.error("浏览器不支持语音识别");
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  // 连续性
  recognition.continuous = true;
  recognition.onresult = (e: any) => {
    console.log(e.results);
  };
  // 处理错误
  recognition.onerror = (e: any) => {
    return ElMessage.error(e.error || "语音识别错误");
  };
  recognition.start();
};
</script>

<template>
  <main>
    <JinRiShiCi class="shici-box max-w-4xl px-4" />
    <ElButton @click="handleSpeechRecognition"> 语音识别 </ElButton>
  </main>
</template>

<style scoped>
.shici-box {
  min-height: calc(100vh - 10rem);
  margin: 10rem auto;
}
</style>
