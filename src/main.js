// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/styles.css'
import 'vue-awesome/icons/archive'
import 'vue-awesome/icons/folder'
import 'vue-awesome/icons/tag'
import 'vue-awesome/icons/tags'

import DefaultLayout from '~/layouts/Default.vue'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

import Icon from 'vue-awesome/components/Icon'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('TheHeader', TheHeader)
  Vue.component('TheFooter', TheFooter)

  Vue.component('VAIcon', Icon)
}
