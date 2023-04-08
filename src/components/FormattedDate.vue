<template>
  <time :datetime="props.date.toISOString()">{{ formatted }}</time>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  date: Date
}>()

const formatted = computed(() => {
  return props.date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })
})
</script>
