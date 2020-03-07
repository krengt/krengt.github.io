<template>
  <div>
    <h1 class="flex items-center">
      <VAIcon :name="iconName" class="mr-2 fill-current" />
      {{ label }}: <span class="text-xl font-bold mx-2">{{ taxonomies.title }}</span>({{ taxonomies.count }} 件)
    </h1>

    <hr class="border-b-2 border-gray-400 my-4">

    <Pager :info="taxonomies.post.pageInfo" linkClass="pager-link" class="pager flex justify-center list-none p-0 my-6" />
    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
      <g-link v-for="article in articles" :key="article.id" :to="article.path">
        <ArticleCard :article="article" class="my-2" />
      </g-link>
    </div>
  </div>
</template>

<script>
import { Pager } from 'gridsome'
import ArticleCard from '~/components/ArticleCard'

export default {
  components: {
    Pager,
    ArticleCard
  },
  props: {
    type: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Taxonomy'
    },
    taxonomies: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    iconName() {
      if (this.type === 'tag') {
        return this.type
      }

      return 'folder'
    },
    articles() {
      if (!this.taxonomies || !this.taxonomies.post) {
        return []
      }

      return this.taxonomies.post.edges.map(edge => edge.node)
    }
  }
}
</script>
