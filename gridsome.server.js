// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const fs = require('fs')

module.exports = function (api) {
  api.loadSource(async ({ getCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const posts = getCollection('Post')
    let categoriesCounter = {}, tagsCounter = {}

    for (const post of posts.findNodes()) {
      let date

      if (post.created) {
        // 1: If front-matter field `created` exists.
        date = post.created
      } else {
        const filename = post.fileInfo.name
        const indexOfFirst = filename.indexOf('.')

        const ymd = filename.substring(0, indexOfFirst)
        const dateStrings = ymd.match(/^([0-9]{4}-[0-9]{2}-[0-9]{2})[-_]?(.+)?/)

        if (dateStrings) {
          // 2: Date string in filename -> new Date
          //   2-1: yyyy-mm-dd
          //   2-2: yyyy-mm-dd-12, yyyy-mm-dd_bar
          const tempDate = new Date(dateStrings[1])

          if (dateStrings[2]) {
            // 2-2-a: If additional parts is Number -> Offset = Number
            let offset = parseInt(dateStrings[2], 10)

            if (!offset) {
              // 2-2-b: If additional parts is not Number -> Offset = Length + 10 mins.
              offset = dateStrings[2].length + 10
            }

            // Offset datetime
            tempDate.setMinutes(offset)
          }

          // Set `created` field
          date = tempDate.getTime()
        } else {
          // 3: `created` field makes from filestat(ctime).
          const stats = fs.statSync(post.internal.origin)
          date = stats.ctimeMs
        }
      }

      post.created = new Date(date)

      // Count categories
      if (post.categories) {
        for (const category of post.categories) {
          if (!categoriesCounter[category]) {
            categoriesCounter[category] = 1
          } else {
            categoriesCounter[category]++
          }
        }
      }
      // Count tags
      if (post.tags) {
        for (const tag of post.tags) {
          if (!tagsCounter[tag]) {
            tagsCounter[tag] = 1
          } else {
            tagsCounter[tag]++
          }
        }
      }

      // Set featured field
      if (!post.featured) {
        post.featured = ''
      }
    }

    // Set categories count
    const categories = getCollection('Category')
    for (const category of categories.findNodes()) {
      category.count = categoriesCounter[category.title]
    }

    // Set tags count
    const tags = getCollection('Tag')
    for (const tag of tags.findNodes()) {
      tag.count = tagsCounter[tag.title]
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
