<template>
  <Layout>
    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
      <div>
        <!-- <span class="text-base md:text-sm text-teal-500 font-bold">&lt;</span> -->
        <!-- <g-link to="/articles" class="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline">
          一覧に戻る
        </g-link> -->

        <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
          {{ article.title }}
        </h1>
        <p class="text-sm md:text-base font-normal text-gray-600">{{ article.date }}</p>
        <div class="flex pt-4">
          <TaxonomyLine type="category" label="Category" :taxonomies="article.categories" />
          <TaxonomyLine type="tag" label="Tags" :taxonomies="article.tags" class="pl-4" />
        </div>
      </div>

      <hr class="border-b-2 border-gray-400 my-4">

      <div v-html="article.content" class="post-content font-medium" />
    </div>
  </Layout>
</template>

<page-query>
query($path: String!) {
  article: wordPressPost(path: $path) {
    id
    path
    title
    content
    date(format:"Y年M月D日")
    tags {
      id
      path
      slug
      title
    }
    categories {
      id
      path
      slug
      title
    }
  }
}
</page-query>

<script>
import TaxonomyLine from '~/components/TaxonomyLine'

export default {
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
