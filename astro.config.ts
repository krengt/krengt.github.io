// astro.config.ts
import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://krengt.github.io',
  markdown: {
    syntaxHighlight: 'prism'
  },
  integrations: [image(), mdx(), sitemap(), tailwind(), vue(), robotsTxt()]
});