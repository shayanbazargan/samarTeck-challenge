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
        lightPry : '#FCE5EE',
        grey25 : '#F5F7FA',
        grey50 : '#E9EDF5',
        grey500 : '#647E9A',
        grey600 : '#57728E',
        grey700 : '#445A74',
        grey800 : '#30445B',
        grey900 : '#253343',
        blue900 : '#0A2A51',
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