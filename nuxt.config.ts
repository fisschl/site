export default defineNuxtConfig({
  css: ["@/assets/base.css", "@/assets/page-transition.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("cropper-"),
    },
  },
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
      title: "主站",
      meta: [{ name: "description", content: "My amazing site." }],
      htmlAttrs: {
        lang: "zh",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://cdn.fisschl.world",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.fisschl.world/HarmonyOS_Sans_SC/font.css",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.fisschl.world/LXGWWenKai/font.css",
          crossorigin: "anonymous",
        },
      ],
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
