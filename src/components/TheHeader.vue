<template>
  <nav class="fixed w-full z-10 top-0" :class="headerClass">
    <div id="progress" class="h-1 z-20 top-0" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>

    <div class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
      <div class="pl-4">
        <a href="/" class="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl"> 
          {{ siteName }}
        </a>
      </div>

      <div class="block lg:hidden pr-4">
        <button
          class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none"
          @click="handleNavContent"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>

      <div
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 lg:bg-transparent z-20"
        :class="[
          navContentClass,
          (showNavContent? '': 'hidden')
        ]"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li v-for="menuItem in menuList" :key="menuItem.to" class="mr-3">
            <a
              :href="menuItem.to"
              class="flex items-center text-gray-600 no-underline hover:text-gray-900 hover:underline py-2 px-4"
              :class="{ active: menuItem.to === pathname }"
            >
              <Icon v-if="menuItem.icon" :name="menuItem.icon" class="mr-2 fill-current" />
              <span>{{ menuItem.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import Icon from "@components/Icon.vue"

const siteName = 'libkrengt'
const menuList = [
  {
    to: '/articles',
    label: '記事',
    icon: 'archive'
  },
  {
    to: '/categories',
    label: 'カテゴリー',
    icon: 'folder'
  },
  {
    to: '/tags',
    label: 'タグ',
    icon: 'tags'
  }
]

const props = defineProps<{
  pathname: string
}>()

const { pathname } = props
const scrollPosition = ref<number | null>(null)
const showNavContent = ref<boolean>(false)

const headerClass = computed(() => {
  if (scrollPosition.value && scrollPosition.value > 10) {
    return 'bg-white shadow'
  }

  return ''
})

const navContentClass = computed(() => {
  if (scrollPosition.value && scrollPosition.value > 10) {
    return 'bg-white'
  }

  return 'bg-gray-100'
})

const active = computed(() => {
  return 'active'
})

const handleScroll = () => {
  scrollPosition.value = window.scrollY
}

const handleNavContent = () => {
  showNavContent.value = !showNavContent.value
}

onMounted(() => {
  scrollPosition.value = window.scrollY
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
a.active {
  @apply text-gray-900;
  @apply font-bold;
  @apply no-underline;
}
</style>