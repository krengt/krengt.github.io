<template>
  <div v-if="taxonomies.length" class="flex items-center text-base md:text-sm text-gray-500 mr-2">
    <VAIcon :name="iconName" class="mr-2" />
    <span>{{ label }}: </span>
    <template
      v-for="taxonomy in taxonomies"
    >
      <g-link
        v-if="useLink"
        :key="taxonomy.id"
        :to="taxonomy.path"
        class="text-base md:text-sm text-teal-500 no-underline hover:underline mx-1"
      >
        {{ taxonomy.title }}
      </g-link>
      <span
        v-else
        :key="taxonomy.id"
        class="text-base md:text-sm text-gray-800 mx-1"
      >
        {{ taxonomy.title }}
      </span>
    </template>
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
    },
    useLink: {
      type: Boolean,
      default: true
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
