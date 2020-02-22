<template>
  <div v-if="taxonomies.length" class="flex items-center text-base md:text-sm text-gray-500 mr-2">
    <VAIcon :name="iconName" class="mr-2" />
    <span>{{ label }}: </span>
    <g-link
      v-for="taxonomy in taxonomies"
      :key="taxonomy.id"
      :to="taxonomy.path"
      class="text-base md:text-sm text-teal-500 no-underline hover:underline mx-1"
    >
      {{ taxonomy.title }}
    </g-link>
  </div>
</template>

<script>
export default {
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
      type: Array,
      default: () => []
    }
  },
  computed: {
    iconName() {
      if (this.type === 'tag') {
        return 'tags'
      }

      return 'folder'
    }
  }
}
</script>
