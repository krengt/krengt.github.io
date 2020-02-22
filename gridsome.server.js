// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// soureceUrl parser
const parseMediaSource = (api, sourceUrl) => {
  const path = require('path')
  const url = require('url')
  const wordpressUrl = process.env.WORDPRESS_CONTAINER_URL || process.env.WORDPRESS_URL

  const parsedUrl = url.parse(sourceUrl)
  const hostRegexp = new RegExp(`${parsedUrl.protocol}//${parsedUrl.host}`, 'g')
  const downloadUrl = sourceUrl.replace(hostRegexp, wordpressUrl)

  const dirName = path.dirname(parsedUrl.pathname).replace(/\/wp-content/g, '')
  const fileName = path.basename(parsedUrl.pathname)
  const filePath = `${dirName}/${fileName}`

  const assetsFilePath = `${api.config.pathPrefix}${filePath}` 
  const staticFilePath = `./static${assetsFilePath}` 

  return {
    downloadUrl,
    assetsFilePath,
    staticFilePath
  }
}

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async ({ getCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const http = require('http')
    const fs = require('fs')
    const mkdirp = require('mkdirp')
    const path = require('path')
    const rimraf = require('rimraf')

    const uploadDirPathRegExp = new RegExp(`${process.env.WORDPRESS_URL}/wp-content`, 'g')
    const uploadFilePathRegExp = new RegExp(`(${process.env.WORDPRESS_URL}/wp-content/[^"'\\s]+)`, 'g')

    rimraf.sync('./static/uploads')

    // collect the uploaded files from WordPress
    const sourceUrlList = []

    // NOTE: Cannot get a specific media from WP-API/media endpoint.
    // @see https://core.trac.wordpress.org/ticket/41445#comment:24
    const attachments = getCollection('WordPressAttachment')
    if (attachments) {
      for (const attachment of attachments.findNodes()) {
        if (attachment.post) {
          sourceUrlList.push(attachment.sourceUrl)

          const sizeKeys = Object.keys(attachment.mediaDetails.sizes)
          sizeKeys.forEach(sizeKey => {
            sourceUrlList.push(attachment.mediaDetails.sizes[sizeKey].sourceUrl)
          })

          const { assetsFilePath } = parseMediaSource(api, attachment.sourceUrl)
          attachment.assetsFilePath = assetsFilePath

          attachment.originalSourceUrl = attachment.sourceUrl
          const replacedSourceUrl = attachment.sourceUrl.replace(uploadDirPathRegExp, `${api.config.pathPrefix}`)
          attachment.sourceUrl = replacedSourceUrl
        }
      }
    }

    // 1. modify the WordPressPost
    //   1. set default featured media
    //   2. remove origin hostname
    // 2. (workaround) above WordPressAttachment problem.
    //   1. uploaded files  
    const posts = getCollection('WordPressPost')
    if (posts) {
      for (const post of posts.findNodes()) {
        // (1-1) set default featured media (if DEFAULT_FEATURED_MEDIA_PATH exists)
        post.defaultFeaturedMediaPath = ''

        if (post.featuredMedia.id === "0" && process.env.DEFAULT_FEATURED_MEDIA_PATH) {
          post.defaultFeaturedMediaPath = process.env.DEFAULT_FEATURED_MEDIA_PATH
        }

        // (1-2) remove origin hostname from content
        // (2-1) collect the uploaded files from WordPress(workaround)
        const attributesRegExp = new RegExp(/=["'](.*?)["']/g)
        const replacedContent = post.content.replace(attributesRegExp, attributeValue => {
          const media = attributeValue.match(uploadFilePathRegExp)

          if (media) {
            sourceUrlList.push(...media)
          }

          return attributeValue.replace(uploadDirPathRegExp, `${api.config.pathPrefix}`)
        })

        post.originalContent = post.content
        post.content = replacedContent
      }
    }

    const uniqueSourceUrlList = sourceUrlList.filter((value, index, self) => { 
      return self.indexOf(value) === index
    })

    // fetch and download the uploaded files and put then in static directory
    uniqueSourceUrlList.forEach(sourceUrl => {
      const {
        downloadUrl,
        staticFilePath
      } = parseMediaSource(api, sourceUrl)

      mkdirp.sync(path.dirname(staticFilePath))

      http.get(downloadUrl, (response) => {
        response.pipe(fs.createWriteStream(staticFilePath))
      })
    })
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
