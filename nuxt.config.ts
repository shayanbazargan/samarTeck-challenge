export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },

  css: [
    '~/assets/scss/Styles.scss',
  ],
  plugins: [
    '~/plugins/axios.js',
  ],
})
