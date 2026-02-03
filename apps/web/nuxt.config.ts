export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  pages: true,
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        "https://bloomer.albanchatelet.fr/api",
    },
  },
});
