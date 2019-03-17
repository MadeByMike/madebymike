var plugins = [{
      plugin: require('/c/Users/mike/Development/madebymike/madebymike.github.io/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/c/Users/mike/Development/madebymike/madebymike.github.io/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"generator":"Mike Riethmuller","query":"\n    {\n      site {\n        siteMetadata {\n          title\n          description\n          siteUrl\n          site_url: siteUrl\n        }\n      }\n    }\n  ","feeds":[{"query":"\n      {\n        allContentfulWriting(\n          limit: 1000,\n          sort: { order: DESC, fields: [publishDate] }\n        ) {\n          edges {\n            node {\n              id\n              title\n              slug\n              publishDate\n              tags\n              description {\n                childMarkdownRemark {\n                  html\n                }\n              }\n              body {\n                childMarkdownRemark {\n                  html\n                }\n              }\n            }\n          }\n        }\n      }\n      ","output":"/rss.xml","title":"MadeByMike"}]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
