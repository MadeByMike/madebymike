import { getExtraCSS, getExtraJS } from '../helpers/extra-page-data'

import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { Post, HTML } from '../components/container'
import React, { Fragment } from 'react'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import styles from './index.module.scss'

export default ({ data }) => {
  const post = get(data, 'contentfulWriting')
  const title = `${post.title} | Mike Riethmuller`
  const description = get(post, 'description.childMarkdownRemark.excerpt')

  const bannerContent = (
    <Fragment>
      <h1 className={styles.headline}>{post.title}</h1>
      {post.description && (
        <HTML content={get(post, 'description.childMarkdownRemark.html')} />
      )}
      <p className={styles.postDate}>
        Published: <time>{post.dateString}</time>
      </p>
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
        update={get(post, 'update.childMarkdownRemark.html')}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query WritingBySlug($slug: String!) {
    contentfulWriting(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
      update {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          html
          excerpt
        }
      }
      dateString: publishDate(formatString: "MMMM Do, YYYY")
      extraCss {
        file {
          url
          fileName
          contentType
        }
      }
      extraJs {
        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`
