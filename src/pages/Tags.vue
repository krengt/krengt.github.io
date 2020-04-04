<template>
  <Layout>
    <div class="w-full px-4 md:px-6">
      <h1 class="flex items-center">
        <VAIcon name="tags" class="mr-2 fill-current" />
        タグ一覧
      </h1>

      <hr class="border-b-2 border-gray-400 my-4">

      <div v-for="tag in tags" :key="tag.id" class="inline-flex items-center text-base md:text-sm text-gray-500 mt-4 mr-8">
        <VAIcon name="tag" class="mr-2 fill-current" />
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
  allTag(sortBy: "count") {
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
    title: 'タグ一覧'
  },
  computed: {
    tags() {
      if (!this.$page || !this.$page.allTag) {
        return []
      }

      return this.$page.allTag.edges.map(edge => edge.node)
    }
  }
}
</script>
