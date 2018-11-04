const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/writing.js')
    const blogPage = path.resolve('./src/templates/page.js')
    resolve(
      graphql(
        `
          {
            allContentfulWriting(sort: { fields: [publishDate], order: DESC }) {
              edges {
                node {
                  id
                  title
                  slug
                  publishDate
                  dateString: publishDate(formatString: "MMMM Do, YYYY")
                  tags
                  description {
                    childMarkdownRemark {
                      html
                    }
                  }
                  color
                }
              }
            }

            allContentfulPage {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulWriting.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/writing/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })

        createPaginatedPages({
          edges: result.data.allContentfulWriting.edges,
          createPage: createPage,
          pageTemplate: './src/templates/writing-index.js',
          pathPrefix: 'writing',
          pageLength: 10,
        })

        const pages = result.data.allContentfulPage.edges
        pages.forEach((post, index) => {
          createPage({
            path: `/${post.node.slug}/`,
            component: blogPage,
            context: {
              slug: post.node.slug,
            },
          })
        })
      })
    )
  })
}
