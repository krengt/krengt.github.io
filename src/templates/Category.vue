<template>
  <Layout>
    <div class="w-full px-4 md:px-6">
      <TaxonomyTemplate type="category" label="カテゴリー" :taxonomies="categories" />
    </div>
  </Layout>
</template>

<page-query>
query($id: ID!, $page: Int) {
  category(id: $id) {
    title
    count
    post: belongsTo(page: $page, perPage: 10, sortBy: "created", order: DESC) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on Post {
            id
            path
            title
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
  }
}
</page-query>

<script>
import TaxonomyTemplate from '~/components/TaxonomyTemplate'

export default {
  components: {
    TaxonomyTemplate
  },
  computed: {
    categories() {
      if (!this.$page || !this.$page.category) {
        return {}
      }

      return this.$page.category
    }
  }
}
</script>
