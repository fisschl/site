export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/devtools",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@element-plus/nuxt",
  ],
  app: {
    head: {
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "page", mode: "out-in" },
  },
  build: {
    transpile: [],
  },
  colorMode: {
    classSuffix: "",
  },
  elementPlus: {
    themes: ["dark"],
  },
});
