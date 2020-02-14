// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async ({ getCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const http = require('http')
    const fs = require('fs')
    const mkdirp = require('mkdirp')
    const path = require('path')
    const url = require('url')
    const rimraf = require('rimraf')

    // Fetch upload files from headless CMS
    const attachments = getCollection('WordPressAttachment')
    rimraf.sync('./static/uploads')

    if (attachments) {
      for (const attachment of attachments.findNodes()) {
        if (attachment.post) {
          const parsedUrl = url.parse(attachment.sourceUrl)
          const hostRegexp = new RegExp(`${parsedUrl.protocol}//${parsedUrl.host}`, 'g')
          const wordpressUrl = process.env.WORDPRESS_CONTAINER_URL || process.env.WORDPRESS_URL
          const downloadUrl = attachment.sourceUrl.replace(hostRegexp, wordpressUrl)

          const dirName = path.dirname(parsedUrl.pathname).replace(/\/wp-content/g, '')
          const fileName = path.basename(parsedUrl.pathname)
          const filePath = `${dirName}/${fileName}`

          const assetsFilePath = `${api.config.pathPrefix}${filePath}` 
          const staticFilePath = `./static${assetsFilePath}` 

          mkdirp.sync(path.dirname(staticFilePath))

          http.get(downloadUrl, (response) => {
            response.pipe(fs.createWriteStream(staticFilePath))
          })

          attachment.assetsFilePath = assetsFilePath
        }
      }
    }

    // Remove origin hostname
    const posts = getCollection('WordPressPost')
    if (posts) {
      for (const post of posts.findNodes()) {
        post.originalContent = post.content

        const attributesRegExp = new RegExp(/["'](.*?)["']/g)
        const uploadPathRegExp = new RegExp(`${process.env.WORDPRESS_URL}/wp-content`, 'g')

        const replacedContent = post.content.replace(attributesRegExp, attributeValue => {
          return attributeValue.replace(uploadPathRegExp, `${api.config.pathPrefix}`)
        })

        post.content = replacedContent
      }
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
