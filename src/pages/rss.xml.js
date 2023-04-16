import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortArticles } from '@libs/articles';

const { SITE_NAME, SITE_DESCRIPTION } = import.meta.env

export async function get(context) {
  const rawArticles = await getCollection('articles')
  const sortedArticles = sortArticles(rawArticles)

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION || '',
    site: context.site,
    items: sortedArticles.map((article) => {
      return {
        link: article.href,
        title: article.title,
        pubDate: article.date,
        description: article.description || '',
        content: article.body || '',
        customData: article.customData || '',
      }
    }),
  })
}