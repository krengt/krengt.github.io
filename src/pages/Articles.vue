<template>
  <Layout>
    <div class="w-full px-4 md:px-6">
      <h1>記事一覧</h1>

      <hr class="border-b-2 border-gray-400 my-4">

      <Pager :info="$page.allPost.pageInfo" linkClass="pager-link" class="pager flex justify-center list-none p-0 my-6" />

      <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <g-link v-for="article in articles" :key="article.id" :to="article.path">
          <ArticleCard :article="article" class="my-2" />
        </g-link>
      </div>

      <Pager :info="$page.allPost.pageInfo" linkClass="pager-link" class="pager flex justify-center list-none p-0 my-6" />
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
  allPost(perPage: 10, page: $page, sortBy: "created", order: DESC) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        path
        title
        excerpt
        created(format:"Y年M月D日(ddd)", locale: "ja-JP")
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
import { Pager } from 'gridsome'
import ArticleCard from '~/components/ArticleCard'

export default {
  metaInfo: {
    title: '記事一覧'
  },
  components: {
    Pager,
    ArticleCard
  },
  computed: {
    articles() {
      return this.$page.allPost.edges.map(edge => edge.node)
    }
  }
}
</script>
