<script setup lang="ts">
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/core";

definePageMeta({
  layout: false,
});

const createEngine = async () => {
  const canvas = document.getElementById("renderCanvas");
  if (!(canvas instanceof HTMLCanvasElement))
    throw new TypeError("Canvas not found");
  const gpuSupported = await WebGPUEngine.IsSupportedAsync;
  if (!gpuSupported) {
    ElMessage("WebGPU not supported, falling back to WebGL");
    return new Engine(canvas, true);
  }
  const engine = new WebGPUEngine(canvas);
  await engine.initAsync();
  return engine;
};

onMounted(async () => {
  const engine = await createEngine();
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera(
    "camera",
    0,
    1,
    20,
    new Vector3(0, 0, 0),
    scene
  );
  camera.lowerRadiusLimit = 1;
  camera.upperRadiusLimit = 100;
  camera.wheelDeltaPercentage = 5 / 1000;
  camera.attachControl();

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.5;

  const sphere = MeshBuilder.CreateBox(
    "sphere",
    {
      size: 4,
    },
    scene
  );
  sphere.position.y = 1;

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
});
</script>

<template>
  <canvas id="renderCanvas" class="h-screen w-screen outline-none"></canvas>
</template>

<style scoped></style>
