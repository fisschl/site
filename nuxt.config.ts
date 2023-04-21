export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/devtools",
    "@nuxtjs/color-mode",
    "@element-plus/nuxt",
  ],
  app: {
    head: {
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
    },
  },
  postcss: {
    plugins: {
      "postcss-preset-env": {},
    },
  },
  colorMode: {
    classSuffix: "",
  },
});
