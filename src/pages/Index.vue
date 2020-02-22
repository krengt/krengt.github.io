<template>
  <Layout>
    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
      <g-link v-for="article in articles" :key="article.id" :to="article.path">
        <ArticleCard :article="article" class="my-2" />
      </g-link>
    </div>
    <div class="flex items-center justify-center m-6">
      <g-link to="/articles" class="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
        もっと読む
      </g-link>
    </div>
  </Layout>
</template>

<page-query>
query {
  articles: allWordPressPost(limit: 10) {
    edges {
      node {
        id
        path
        title
        excerpt
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
        defaultFeaturedMediaPath
        featuredMedia {
          sourceUrl
        }
      }
    }
  }
}
</page-query>

<script>
import ArticleCard from '~/components/ArticleCard.vue'

export default {
  components: {
    ArticleCard
  },
  computed: {
    articles() {
      if (!this.$page || !this.$page.articles) {
        return []
      }

      return this.$page.articles.edges.map(edge => edge.node)
    }
  }
}
</script>
