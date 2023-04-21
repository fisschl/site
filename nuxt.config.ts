export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/devtools", "@vueuse/nuxt"],
  app: {
    head: {
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [{ src: "/theme.js", type: "module", defer: true }],
    },
  },
  postcss: {
    plugins: {
      "postcss-preset-env": {},
    },
  },
});
