// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: process.env.SITE_NAME,
  siteUrl: process.env.SITE_URL,
  plugins: [
    {
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: process.env.WORDPRESS_CONTAINER_URL || process.env.WORDPRESS_URL,
        apiBase: 'wp-json',
        typeName: 'WordPress',
        perPage: 100,
        concurrent: 10
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
    }
  ],
  templates: {
    WordPressCategory: '/category/:slug',
    WordPressPost: '/:year/:month/:day/:slug',
    WordPressPostTag: '/tag/:slug'
  }
}
