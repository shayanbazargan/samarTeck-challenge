// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myTheme = {
    colors: {
        pry : '#E20054',
        lightPry : '##FCE5EE',
    },
}

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: 'myTheme',
            themes: {
                myTheme,
            },
        },
    })
    nuxtApp.vueApp.use(vuetify)
})