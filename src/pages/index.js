import React, { Fragment } from 'react'

import Container from '../components/container'
import Layout from '../components/layout'
import NotesGrid from '../components/notes-grid'
import Section from '../components/section'
import get from 'lodash/get'
import { graphql } from 'gatsby'

const sortByPublishDate = (a, b) => {
  var keyA = Date.parse(a.publishDate),
    keyB = Date.parse(b.publishDate)
  // Compare the 2 dates
  if (keyA < keyB) return 1
  if (keyA > keyB) return -1
  return 0
}

const FooterContent = () => (
  <Container>
    <h2>More about me</h2>
    <p>
      Oh, hey! You’re still here, good for you! You should know I’m passionate
      about web development and that doesn’t just mean standards; I’m an
      advocate for anything and anyone that contributes to good quality web
      development.
    </p>
    <p>
      I’ve worked as a front-end developer on some of Australia’s largest
      websites as well as some of the smallest community sites. When I’m not
      building sites or blogging I like to experiment with code. I love learning
      new things and finding techniques that challenge what we think is best
      practice. Although very few ideas make it into my production toolkit, I
      find experimentation is the best way learn and the only way to discover
      new techniques.
    </p>
    <p>
      I try to share everything I learn, I speak, I blog and sometimes help
      organise community events &amp; meetups.
    </p>
    <p>
      I’m available for hire! Why don’t you{' '}
      <a href="mailto:mike@madebymike.com.au">get in touch</a>?
    </p>
  </Container>
)

const bannerContent = (
  <Fragment>
    <h1>Hello, I’m Mike Riethmuller</h1>
    <p>
      I’m a <strong>web developer</strong> and I make all sorts of stuff for the
      web. You can find some of my <s>code</s> <s>work</s> <s>experiments</s>{' '}
      <s>creations</s> shame on{' '}
      <a href="http://codepen.io/MadeByMike/">CodePen</a> or{' '}
      <a href="https://github.com/MadeByMike">GitHub</a> and you can talk to me
      on <a href="https://twitter.com/MikeRiethmuller">Twitter</a>.
    </p>
  </Fragment>
)

export default ({ data }) => {
  const writing = get(data, 'writing.edges', []).map(card => {
    return { ...card.node, type: 'Writing' }
  })

  const external = get(data, 'external.edges', []).map(card => {
    return { ...card.node, type: 'External' }
  })

  const cards = get(data, 'cards.edges', [])
    .map(card => card.node)
    .concat(writing)
    .concat(external)
    .sort(sortByPublishDate)
    .slice(0, 20)

  const notAds = get(data, 'notAds.edges', []).map(card => {
    return { ...card.node, type: 'Not Ad' }
  })

  return (
    <Layout bannerContent={bannerContent}>
      <Section>
        <NotesGrid notAds={notAds} cards={cards} />
      </Section>
      <Section>
        <FooterContent />
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomeQuery {
    writing: allContentfulWriting(
      limit: 20
      sort: { fields: [publishDate], order: DESC }
    ) {
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
          size
        }
      }
    }

    cards: allContentfulCard(
      limit: 20
      sort: { fields: [publishDate], order: DESC }
      filter: { type: { ne: "Not ad" } }
    ) {
      edges {
        node {
          id
          title
          type
          publishDate
          dateString: publishDate(formatString: "MMMM Do, YYYY")
          url
          color
          size
          image {
            title
            description
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }

    external: allContentfulExternalArticle(
      limit: 20
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          id
          title
          publishDate
          dateString: publishDate(formatString: "MMMM Do, YYYY")
          url
          color
          size
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }

    notAds: allContentfulCard(
      limit: 2
      sort: { fields: [publishDate], order: DESC }
      filter: { type: { eq: "Not ad" } }
    ) {
      edges {
        node {
          id
          title
          type
          publishDate
          dateString: publishDate(formatString: "MMMM Do, YYYY")
          url
          color
          size
          image {
            title
            description
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
