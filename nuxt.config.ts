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
      title: "My Site",
      meta: [{ name: "description", content: "My amazing site." }],
      htmlAttrs: {
        lang: "zh",
      },
      script: [
        {
          src: "https://sdk.jinrishici.com/v2/browser/jinrishici.js",
          async: true,
        },
      ],
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
