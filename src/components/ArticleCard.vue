<template>
  <div
    class="relative w-full lg:max-w-full lg:flex hover:shadow-2xl"
    :class="{'lg:h-32': !isSimpleMode && featuredMediaUrl}"
  >
    <div
      v-if="!isSimpleMode && featuredMediaUrl"
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-center"
      :style="`background-image: url(${featuredMediaUrl})`"
      :title="article.title"
    >
    </div>
    <div
      class="w-full lg:max-w-full border border-gray-400 lg:border-gray-400 bg-white px-4 py-2 flex flex-col justify-between leading-normal overflow-y-hidden"
      :class="[isSimpleMode || !featuredMediaUrl? 'rounded' : 'lg:border-l-0 lg:border-t rounded-b lg:rounded-b-none lg:rounded-r']"
    >
      <div class="flex flex-col justify-between h-full">
        <small class="text-sm text-gray-600">{{ article.date }}</small>
        <div class="flex flex-col lg:flex-row">
          <TaxonomyLine type="category" label="Category" :taxonomies="article.categories" :useLink="false" />
          <TaxonomyLine type="tag" label="Tags" :taxonomies="article.tags" :useLink="false" />
        </div>
        <div class="text-gray-900 font-bold text-xl my-2">{{ article.title }}</div>
        <div v-if="!isSimpleMode" class="text-gray-600 text-right">{{ article.created }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TaxonomyLine from '~/components/TaxonomyLine'

export default {
  components: {
    TaxonomyLine
  },
  props: {
    mode: {
      type: String,
      default: 'full' // full | simple
    },
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isSimpleMode() {
      return this.mode === 'simple'
    },
    featuredMediaUrl() {
      if (!this.article.featured && process.env.GRIDSOME_DEFAULT_FEATURED_MEDIA) {
        return process.env.GRIDSOME_DEFAULT_FEATURED_MEDIA
      }

      return this.article.featured
    }
  }
}
</script>
