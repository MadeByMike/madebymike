const get = require('lodash/get')
let contentfulConfig

try {
  contentfulConfig = require('./.contentful')
} catch (_) {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  }
} finally {
  const { spaceId, accessToken } = contentfulConfig

  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful spaceId and the delivery token need to be provided.'
    )
  }
}

module.exports = {
  siteMetadata: {
    title: `MadeByMike`,
    description: `A web development blog where basically I think stuff and sometimes I write about it.`,
    siteUrl: `https://madebymike.com.au/`,
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        generator: `Mike Riethmuller`,
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allContentfulWriting } }) => {
              return allContentfulWriting.edges.map(edge => {
                return {
                  title: edge.node.title,
                  description: (get(edge, 'node.description.childMarkdownRemark.html') || '') + (get(edge,'node.body.childMarkdownRemark.html') || ''),
                  date: edge.node.publishDate,
                  guid: edge.node.id,
                  url: site.siteMetadata.siteUrl + edge.node.slug
                }
              })
            },
            query: `
            {
              allContentfulWriting(
                limit: 1000,
                sort: { order: DESC, fields: [publishDate] }
              ) {
                edges {
                  node {
                    id
                    title
                    slug
                    publishDate
                    tags
                    description {
                      childMarkdownRemark {
                        html
                      }
                    }
                    body {
                      childMarkdownRemark {
                        html
                      }
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'MadeByMike',
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}
