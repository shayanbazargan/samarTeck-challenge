export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,

  components: [
    { path: '~/components', pathPrefix: false }
  ],

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
