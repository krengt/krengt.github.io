<template>
  <div>
    <h1 class="flex items-center">
      <Icon :name="iconName" class="mr-2 fill-current" />
      {{ label }}: <span class="text-xl font-bold mx-2">{{ taxonomy }}</span>({{ articles.length }} 件)
    </h1>

    <hr class="border-b-2 border-gray-400 my-4">

    <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
      <a v-for="article in articles" :key="article.href" :href="article.href">
        <ArticleCard :article="article" class="my-2" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from '@components/ArticleCard.vue'
import Icon from '@components/Icon.vue'
import type { Article } from '@libs/articles'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type: string
  label?: string
  taxonomy: string
  articles: Array<Article>
}>(), {
  label: 'Taxonomy'
})

const { taxonomy, articles } = props

const iconName = computed(() => {
  if (props.type === 'tag') {
    return props.type
  }

  return 'folder'
})
</script>
