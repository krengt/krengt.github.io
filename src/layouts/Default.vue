<template>
  <div class="bg-gray-100 font-sans leading-normal tracking-normal">
    <TheHeader :site-name="$static.metadata.siteName" :menu-list="menuList" />

    <!--Container-->
    <div class="container w-full md:max-w-3xl mx-auto pt-20 pb-6">
      <slot />
    </div>
    <!--/container-->

    <TheFooter :data="footerData" />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          to: '/articles',
          label: '記事',
          icon: 'archive'
        },
        {
          to: '/categories',
          label: 'カテゴリー',
          icon: 'folder'
        },
        {
          to: '/tags',
          label: 'タグ',
          icon: 'tags'
        }
      ]
    }
  },
  computed: {
    footerData() {
      return {
        about: {
          markdown: `${this.$static.metadata.siteDescription}このブログのソースは [こちら](https://github.com/krengt/krengt.github.io)`
        },
        socials: [
          {
            type: "twitter",
            label: '@krengt',
            href: 'https://twitter.com/krengt',
            description: '日常アカウント'
          },
          {
            type: "twitter",
            label: '@libkrengt',
            href: 'https://twitter.com/libkrengt',
            description: 'Tech・技術系アカウント'
          }
        ]
      }
    }
  }
}
</script>
