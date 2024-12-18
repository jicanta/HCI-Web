/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: colors.blueGrey.lighten4,
          primary: colors.deepPurple.darken4,
          secondary: colors.deepPurple.darken1,
          tertiary: colors.blueGrey.lighten5,
          colortext: colors.deepPurple.darken4,
          colortext2: colors.shades.black,
        }
      },
      dark: {
        light: false,
        colors: {
          background: colors.blueGrey.darken3,
          primary: colors.blueGrey.darken4,
          secondary: colors.blueGrey.lighten1,
          tertiary: colors.blueGrey.darken2,
          colortext: colors.blueGrey.lighten3,
          colortext2: colors.shades.white,
        }
      }
    }
  },
  defaults: {
    VApp: {
      style: [
        { fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }
      ]
    },
    VBtn: { fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
    VCard: { fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
    VTextField: { fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
    VList: { fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' },
    VToolbar: { fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }
  }
})
