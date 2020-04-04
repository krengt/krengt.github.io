// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import '~/assets/styles.scss'
import 'vue-awesome/icons/archive'
import 'vue-awesome/icons/folder'
import 'vue-awesome/icons/tag'
import 'vue-awesome/icons/tags'

import DefaultLayout from '~/layouts/Default.vue'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

import Icon from 'vue-awesome/components/Icon'

import 'prismjs/themes/prism.css'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('TheHeader', TheHeader)
  Vue.component('TheFooter', TheFooter)

  Vue.component('VAIcon', Icon)

  // Set html attributes
  head.htmlAttrs = {
    lang: process.env.GRIDSOME_HTML_LANG || 'en'
  }

  // Set head values
  head.meta.push(...[
    {
      key: 'description',
      name: 'description',
      content: process.env.GRIDSOME_SITE_DESCRIPTION
    },
    {
      key: 'og:description',
      property: 'og:description',
      content: process.env.GRIDSOME_SITE_DESCRIPTION
    },
    {
      key: 'og:type',
      property: 'og:type',
      content: 'website'
    },
    {
      key: 'og:title',
      property: 'og:title',
      content: process.env.GRIDSOME_SITE_NAME
    },
    {
      key: 'og:url',
      property: 'og:url',
      content: process.env.GRIDSOME_SITE_URL
    },
    {
      key: 'og:image',
      property: 'og:image',
      content: `${process.env.GRIDSOME_SITE_URL}${process.env.GRIDSOME_DEFAULT_FEATURED_MEDIA}`
    },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary'
    }
  ])
}
