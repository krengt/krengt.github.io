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
  article: post(path: $path) {
    id
    path
    title
    content
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
    return {
      title: this.$page.article.title || '',
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