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
  articles: allPost(limit: 10, sortBy: "created", order: DESC) {
    edges {
      node {
        id
        path
        title
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
  }
}
</page-query>

<script>
import ArticleCard from '~/components/ArticleCard.vue'

export default {
  metaInfo: {
    title: '最近の記事'
  },
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
