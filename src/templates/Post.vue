<template>
  <Layout>
    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
      <div>
        <!-- <span class="text-base md:text-sm text-teal-500 font-bold">&lt;</span> -->
        <!-- <g-link to="/articles" class="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline">
          一覧に戻る
        </g-link> -->

        <div v-if="article.featured">
          <img class="featured" :src="article.featured" />
        </div>
        <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
          {{ article.title }}
        </h1>
        <p class="text-sm md:text-base font-normal text-gray-600">{{ article.date }}</p>
        <div class="flex pt-4">
          <TaxonomyLine type="category" label="Category" :taxonomies="article.categories" />
          <TaxonomyLine type="tag" label="Tags" :taxonomies="article.tags" class="pl-4" />
        </div>
        <div class="text-gray-600 text-right">{{ article.created }}</div>
      </div>

      <hr class="border-b-2 border-gray-400 my-4">

      <div v-html="article.content" class="post-content font-medium leading-9" />
    </div>
  </Layout>
</template>

<page-query>
query($path: String!) {
  metadata {
    siteUrl
  }
  article: post(path: $path) {
    id
    path
    title
    content
    excerpt
    created(format:"Y年M月D日(ddd)", locale: "ja-JP")
    featured
    tags {
      id
      path
      title
    }
    categories {
      id
      path
      title
    }
  }
}
</page-query>

<script>
import TaxonomyLine from '~/components/TaxonomyLine'

export default {
  metaInfo() {
    if (!this.$page) {
      return null
    }
    return {
      title: this.$page.article.title || '',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.article.excerpt
        },
        {
          key: 'og:description',
          property: 'og:description',
          content: this.$page.article.excerpt
        },
        {
          key: 'og:title',
          property: 'og:title',
          content: this.$page.article.title
        },
        {
          key: 'og:url',
          property: 'og:url',
          content: `${this.$page.metadata.siteUrl}${this.$page.article.path}`
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: this.ogpImage
        },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  },
  components: {
    TaxonomyLine
  },
  computed: {
    article() {
      if (!this.$page || !this.$page.article) {
        return {}
      }

      return this.$page.article
    },
    ogpImage() {
      let mediaPath

      if (!this.$page.article.featured && process.env.GRIDSOME_DEFAULT_FEATURED_MEDIA) {
        mediaPath = process.env.GRIDSOME_DEFAULT_FEATURED_MEDIA
      } else {
        mediaPath = this.$page.article.featured
      }

      return `${this.$page.metadata.siteUrl}${mediaPath}`
    }
  }
}
</script>

<style lang="scss">
.post-content {
  h2 {
    @apply text-4xl;
  }
  p {
    @apply my-4;

    >code {
      @apply bg-gray-300;
      @apply text-red-600;
    }
  }
  figcaption {
    @apply text-sm;
    @apply text-gray-700;
    @apply text-center;
  }
  blockquote {
    @apply text-base;
    @apply px-5;
    @apply py-2;
    @apply bg-gray-200;
    @apply border-l-8;
    @apply border-gray-500;
    @apply shadow;
  }
  ul {
    @apply list-disc;
    @apply pl-8;
    li {
      p {
        @apply inline;
      }
    }
  }
  pre {
    @apply text-base;
  }
}
</style>