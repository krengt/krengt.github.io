<template>
  <Layout>
    <div class="w-full px-4 md:px-6">
      <h1 class="flex items-center">
        <VAIcon name="tags" class="mr-2" />
        タグ一覧
      </h1>

      <hr class="border-b-2 border-gray-400 my-4">

      <div v-for="tag in tags" :key="tag.id" class="inline-flex items-center text-base md:text-sm text-gray-500 mt-4 mr-8">
        <VAIcon name="tag" class="mr-2" />
        <g-link
          :to="tag.path"
          class="text-base md:text-xl text-teal-500 no-underline hover:underline mx-1"
        >
          {{ tag.title }}({{ tag.count }})
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  allWordPressPostTag {
    edges {
      node {
        id
        path
        slug
        title
        count
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    tags() {
      if (!this.$page || !this.$page.allWordPressPostTag) {
        return []
      }

      return this.$page.allWordPressPostTag.edges.map(edge => edge.node)
    }
  }
}
</script>
