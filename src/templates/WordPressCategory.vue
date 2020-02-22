<template>
  <Layout>
    <div class="w-full px-4 md:px-6">
      <TaxonomyTemplate type="category" label="Category" :taxonomies="categories" />
    </div>
  </Layout>
</template>

<page-query>
query($id: ID!, $page: Int) {
  wordPressCategory(id: $id) {
    title
    count
    allWordPressPost: belongsTo(page: $page, perPage: 2) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on WordPressPost {
            id
            path
            title
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
      if (!this.$page || !this.$page.wordPressCategory) {
        return {}
      }

      return this.$page.wordPressCategory
    }
  }
}
</script>
