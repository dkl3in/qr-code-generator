// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  app: {
    // Der Basis-URL für das Deployment auf GitHub Pages.
    // Ersetze 'qr-code-generator' mit dem Namen deines GitHub-Repositories.
    baseURL: '/qr-code-generator/' 
  }
})