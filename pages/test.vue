<script setup lang="ts">
import {
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  Scene,
  SceneLoader,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

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
  scene.clearColor = new Color4(0.5, 0.5, 0.5);

  const camera = new ArcRotateCamera(
    "camera",
    0,
    1.6,
    5,
    new Vector3(0, 1.5, 0),
    scene
  );
  camera.lowerRadiusLimit = 1;
  camera.upperRadiusLimit = 100;
  camera.wheelDeltaPercentage = 5 / 1000;
  camera.attachControl();

  const light1 = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light1.intensity = 2;

  await SceneLoader.ImportMeshAsync("", "/3d/irena/", "scene.gltf", scene);

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
});
</script>

<template>
  <canvas id="renderCanvas" class="h-screen w-screen outline-none"></canvas>
</template>

<style scoped></style>
