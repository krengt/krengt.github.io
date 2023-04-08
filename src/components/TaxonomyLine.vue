<template>
  <div class="flex items-center text-base md:text-sm text-gray-500 mr-2">
    <Icon :name="iconName" class="mr-2 fill-current" />
    <template
      v-for="(taxonomy, index) in taxonomies"
      :key="index"
    >
      <a
        v-if="useLink"
        :href="`/${type}/${taxonomy}`"
        class="text-base md:text-sm text-teal-500 no-underline hover:underline mx-1"
      >
        {{ taxonomy }}
      </a>
      <span
        v-else
        class="text-base md:text-sm text-gray-800 mx-1"
      >
        {{ taxonomy }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import Icon from '@components/Icon.vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type: string
  label: string
  taxonomies: string[]
  useLink?: boolean
}>(), {
  label: 'Taxonomy',
  useLink: true
})

const iconName = computed(() => {
  if (props.type === 'tag') {
    return 'tags'
  }

  return 'folder'
})
</script>
