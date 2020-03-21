// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const slugify = require('markdown-slug')

module.exports = {
  siteName: process.env.SITE_NAME,
  siteUrl: process.env.SITE_URL,
  permalinks: {
    slugify: {
      use: 'markdown-slug',
      options: {}
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'articles/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          },
          categories: {
            typeName: 'Category',
            create: true
          }
        },
        remark: {
          // remark options
        }
      }
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      /* These are the default options. You don't need to set any options to get going.
      options: {
        tailwindConfig: './some/file/js',
        purgeConfig: {},
        presetEnvConfig: {},
        shouldPurge: true,
        shouldImport: true,
        shouldTimeTravel: true
      }
      */
     options: {
       tailwindConfig: './tailwind.config.js'
     }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        // cacheTime: 600000,
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GA_ID
      }
    }
  ],
  transformers: {
    remark: {
      // global remark options
      // externalLinksTarget: '_blank',
      // externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      // autolinkClassName: 'icon icon-link',
    }
  },
  templates: {
    Category: [
      {
        path: (node) => {
          const slug = slugify(node.title).replace(/%(.{2})/g, '-$1').toLowerCase()
          return `/category/${slug}`
        }
      }
    ],
    Post: [
      {
        path: (node) => {
          const filename = node.fileInfo.name
          const indexOfFirst = filename.indexOf('.')

          const ymd = filename.substring(0, indexOfFirst)
          const slug = slugify(filename.substring(indexOfFirst+1))
          const [year, month, date] = ymd.split('-')

          return `/article/${year}/${month}/${date}/${slug}`
        }
      }
    ],
    Tag: [
      {
        path: (node) => {
          const slug = slugify(node.title).replace(/%(.{2})/g, '-$1').toLowerCase()
          return `/tag/${slug}`
        }
      }
    ]
  }
}
