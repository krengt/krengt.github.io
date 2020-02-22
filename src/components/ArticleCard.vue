<template>
  <div
    class="relative w-full lg:max-w-full lg:flex hover:shadow-2xl"
    :class="{'lg:h-40': !isSimpleMode && featuredMediaUrl}"
  >
    <div
      v-if="!isSimpleMode && featuredMediaUrl"
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-center"
      :style="`background-image: url(${featuredMediaUrl})`"
      :title="article.title"
    >
    </div>
    <div
      class="w-full lg:max-w-full border border-gray-400 lg:border-gray-400 bg-white px-4 pt-1 flex flex-col justify-between leading-normal overflow-y-hidden"
      :class="[isSimpleMode || !featuredMediaUrl? 'rounded' : 'lg:border-l-0 lg:border-t rounded-b lg:rounded-b-none lg:rounded-r']"
    >
      <div :class="[isSimpleMode? 'mb-4' : 'mb-8']">
        <small class="text-sm text-gray-600">{{ article.date }}</small>
        <div class="flex flex-col lg:flex-row">
          <TaxonomyLine type="category" label="Category" :taxonomies="article.categories" />
          <TaxonomyLine type="tag" label="Tags" :taxonomies="article.tags" />
        </div>
        <div class="text-gray-900 font-bold text-xl my-2">{{ article.title }}</div>
        <p v-if="!isSimpleMode" v-html="article.excerpt" class="text-gray-600 text-xs" />
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
      if (!this.article.featuredMedia) {
        return this.article.defaultFeaturedMediaPath
      }

      return this.article.featuredMedia.sourceUrl
    }
  }
}
</script>
