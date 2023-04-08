<template>
  <footer class="bg-white border-t border-gray-400">	
    <div class="container max-w-4xl mx-auto flex py-8">

      <div class="w-full mx-auto flex flex-wrap">
        <div class="flex w-full md:w-1/2 ">
          <div class="px-8">
            <h3 class="font-bold text-gray-900">なにこれ</h3>
            <p class="py-4 text-gray-600 text-sm">
              このブログのソースは <a :href="about.href">こちら</a>
            </p>
          </div>
        </div>
        
        <div class="flex w-full md:w-1/2">
          <div class="px-8">
          <h3 class="font-bold text-gray-900">Web 上の居所</h3>
          <dl class="list-reset items-center text-sm pt-3">
            <template v-for="(social, index) in socials" :key="index">
              <dt>
                <a class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" :href="social.href">
                  {{ social.label }}
                </a>
              </dt>
              <dd class="pl-4 text-xs text-gray-700">
                {{ social.description }}
              </dd>
            </template>
          </dl>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const about = {
  href: 'https://github.com/krengt/krengt.github.io'
}

const socials = [
  {
    type: "twitter",
    label: '@krengt',
    href: 'https://twitter.com/krengt',
    description: '日常アカウント'
  },
  {
    type: "twitter",
    label: '@libkrengt',
    href: 'https://twitter.com/libkrengt',
    description: 'Tech・技術系アカウント'
  }
]
</script>
