<template>
  <Layout>
    <div class="w-full px-4 md:px-6">
      <h1 class="flex items-center">
        <VAIcon name="folder" class="mr-2 fill-current" />
        カテゴリー一覧
      </h1>

      <hr class="border-b-2 border-gray-400 my-4">

      <div v-for="category in categories" :key="category.id" class="inline-flex items-center text-base md:text-sm text-gray-500 mt-4 mr-8">
        <VAIcon name="folder" class="mr-2 fill-current" />
        <g-link
          :to="category.path"
          class="text-base md:text-xl text-teal-500 no-underline hover:underline mx-1"
        >
          {{ category.title }}({{ category.count }})
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allCategory(sortBy: "count") {
    edges {
      node {
        id
        path
        title
        count
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'カテゴリー一覧'
  },
  computed: {
    categories() {
      if (!this.$page || !this.$page.allCategory) {
        return []
      }

      return this.$page.allCategory.edges.map(edge => edge.node)
    }
  }
}
</script>
