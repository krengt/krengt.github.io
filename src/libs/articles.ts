import type { MarkdownInstance } from "astro";
import type { CollectionEntry } from "astro:content";

// @see https://www.ey-office.com/blog_archive/2022/12/22/astro-might-be-good-for-building-websites-like-blogs/

type collectionType = 'articles'

export type ArticleParams = {
  date: Date
  year: string
  month: string
  day: string
  title: string
  slug: string
  categories: Array<string>
  tags: Array<string>
  href: string
  featured?: string
}

export type Article = Omit<ArticleParams, 'year' | 'month' | 'day'>

export type Tag = {
  name: string
  count: number
}

export type Category = {
  name: string
  count: number
}

export const articleParams = (collection: CollectionEntry<collectionType>): ArticleParams => {
  const filename = collection.id.split('/').pop()

  if (!filename) {
    throw new Error('Invalid filename.')
  }

  const [articleDate, slug, _ext] = filename.split('.')
  const [year, month, day] = articleDate.split('-')
  const href = `/article/${year}/${month}/${day}/${slug}`
  const { title, categories, tags, featured } = collection.data

  return {
    date: new Date(articleDate),
    year,
    month,
    day,
    title,
    slug,
    categories,
    tags,
    href,
    featured,
  }
}

export const buildArticle = (collection: CollectionEntry<collectionType>): Article => {
  const { slug, date, href, title, categories, tags, featured } = articleParams(collection)

  return {
    ...collection,
    title,
    slug,
    categories,
    tags,
    date,
    href,
    featured,
  }
}

export const sortArticles = (collections: CollectionEntry<collectionType>[]): Article[] => {
  const articles = collections.map((collection) => buildArticle(collection))

  articles.sort((a, b) => {
    return a && b ? b.date.getTime() - a.date.getTime() : 0
  })

  return articles
}

export const sortArticlesBy = (
  collections: CollectionEntry<collectionType>[],
  options: {
    by: 'categories' | 'tags'
  }
): Array<{
  tags?: string
  categories?: string
  articles: Article[]
}> => {
  const articles = collections.map((collection) => buildArticle(collection))

  const keysArticleMap: Map<string, Article[]> = new Map()

  articles.forEach((article) => {
    const keys = article[options.by]

    keys.forEach((key) => {
      if (!keysArticleMap.has(key)) {
        keysArticleMap.set(key, [])
      }
  
      const current = keysArticleMap.get(key)
      current?.push(article)
    })
  })

  keysArticleMap.forEach((articles) => articles.sort((a, b) => {
    return a && b ? b.date.getTime() - a.date.getTime() : 0
  }))

  return Array.from(keysArticleMap).map(([key, articles]) => {
    return {
      [options.by]: key,
      articles,
    }
  })
}

type TaxonomyTypes = 'categories' | 'tags'

export const sortTaxonomies = (
  collections: CollectionEntry<collectionType>[],
  type: TaxonomyTypes
): Category[] | Tag[] => {
  const taxonomyObject: {
    [key: string]: number
  } = {}

  collections.forEach((collection) => {
    if (collection.data[type].length > 0) {
      collection.data[type].forEach((taxonomy: string) => {
        if (!taxonomyObject[taxonomy]) {
          taxonomyObject[taxonomy] = 0
        }
        
        taxonomyObject[taxonomy] += 1
      })
    }
  })

  const taxonomies = Object.entries(taxonomyObject)
    .sort(([a], [b]) => a < b ? -1 : 1)
    .map(([name, count]) => {
      return {
        name, count
      }
    })
  
  return taxonomies
}
