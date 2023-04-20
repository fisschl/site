export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/devtools"],
  app: {
    head: {
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [{ src: "/theme.js", type: "module", defer: true }],
    },
  },
});
