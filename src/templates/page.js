import { HTML, Post } from '../components/container'
import React, { Fragment } from 'react'
import { getExtraCSS, getExtraJS } from '../helpers/extra-page-data'

import Helmet from 'react-helmet'
import Layout from '../components/layout'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import styles from './index.module.scss'

export default ({ data }) => {
  const post = get(data, 'contentfulPage') || {}
  const title = `${post.title} | Mike Riethmuller`
  const description = post.description

  const bannerContent = (
    <Fragment>
      <h1 className={styles.headline}>{post.title}</h1>
      {post.description && (
        <HTML content={get(post, 'description.childMarkdownRemark.html')} />
      )}
    </Fragment>
  )

  return (
    <Layout bannerContent={bannerContent}>
      <Helmet>
        <title>{title}</title>
        
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="{{ .Permalink }}" />

      </Helmet>
      {getExtraCSS(post.extraCss)}
      {getExtraJS(post.extraJs)}
      <Post
        content={get(post, 'body.childMarkdownRemark.html') || ''}
        aside={get(post, 'sidebar.childMarkdownRemark.html')}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      sidebar {
        childMarkdownRemark {
          html
        }
      }
      # extraCss {
      #   file {
      #     url
      #     fileName
      #     contentType
      #   }
      # }
      # extraJs {
      #   file {
      #     url
      #     fileName
      #     contentType
      #   }
      # }
    }
  }
`
