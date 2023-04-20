export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/devtools",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],
  app: {
    head: {
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [{ src: "/theme.js", type: "module" }],
    },
  },
  postcss: {
    plugins: {
      "postcss-preset-env": {},
    },
  },
});
