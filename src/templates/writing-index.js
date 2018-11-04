import React, { Fragment } from 'react'

import Container from '../components/container'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Link from 'gatsby-link'
import Section from '../components/section'
import get from 'lodash/get'
import styles from './writing.module.scss'

const bannerContent = (
  <Fragment>
    <h1>Stuff I wrote</h1>
    <p>
      A range of unique and possibly interesting web development ideas of
      varying quality. Basically "I think stuff and sometimes I write it down".
    </p>
  </Fragment>
)

export default ({ data, pageContext }) => {
  const { group, index, first, last, pageCount } = pageContext
  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <Layout bannerContent={bannerContent}>
      <Helmet>
        <title>{`Writing | Mike Riethmuller`}</title>
      </Helmet>
      <Container>
        <Section>
          {group.map(words => {
            const post = words.node
            return (
              <section className={styles.writingSection}>
                <div className={styles.postMeta}>
                  <h2 className={styles.postTitle}>
                    <a href={`/writing/${post.slug}`}>{post.title}</a>
                  </h2>
                  <span className={styles.postDate}>
                    <time>{post.dateString}</time>
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      get(words, 'node.description.childMarkdownRemark.html') ||
                      '',
                  }}
                />
                <p>
                  <a
                    className={styles.postContinueReading}
                    href={`/writing/${post.slug}`}
                  >
                    Continue reading…
                  </a>
                </p>
              </section>
            )
          })}
          <div className={styles.pagination}>
            {!last && (
              <div className="paginationLink">
                <Link to={`/writing/${nextUrl}`}>&larr; Older</Link>
              </div>
            )}
            {!first && (
              <div className="paginationLink">
                <Link to={`/writing/${previousUrl}`}>Newer &rarr;</Link>
              </div>
            )}
          </div>
        </Section>
      </Container>
    </Layout>
  )
}
