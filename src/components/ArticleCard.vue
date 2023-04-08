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
        <div class="flex flex-col lg:flex-row">
          <TaxonomyLine type="category" label="Category" :taxonomies="article.categories" :useLink="false" />
          <TaxonomyLine type="tag" label="Tags" :taxonomies="article.tags" :useLink="false" />
        </div>
        <div class="text-gray-900 font-bold text-xl my-2">{{ article.title }}</div>
        <FormattedDate v-if="!isSimpleMode" class="text-gray-600 text-right" :date="article.date" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaxonomyLine from '@components/TaxonomyLine.vue'
import FormattedDate from '@components/FormattedDate.vue'
import type { Article } from '@libs/articles'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  mode?: 'full' | 'simple'
  article: Article
}>(), {
  mode: 'full'
})

const isSimpleMode = computed(() => {
  return props.mode === 'simple'
})

const featuredMediaUrl = computed(() => {
  if (!props.article.featured) {
    return '/images/default_media.jpg'
  }

  return props.article.featured
})
</script>
