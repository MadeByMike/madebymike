const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-gatsby-plugin-offline-app-shell-js": hot(preferDefault(require("/c/Users/mike/Development/madebymike/madebymike.github.io/node_modules/gatsby-plugin-offline/app-shell.js"))),
  "component---src-templates-writing-js": hot(preferDefault(require("/c/Users/mike/Development/madebymike/madebymike.github.io/src/templates/writing.js"))),
  "component---src-templates-writing-index-js": hot(preferDefault(require("/c/Users/mike/Development/madebymike/madebymike.github.io/src/templates/writing-index.js"))),
  "component---src-templates-page-js": hot(preferDefault(require("/c/Users/mike/Development/madebymike/madebymike.github.io/src/templates/page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/c/Users/mike/Development/madebymike/madebymike.github.io/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/c/Users/mike/Development/madebymike/madebymike.github.io/src/pages/index.js")))
}

