import React, { Fragment } from 'react'

import Container from '../components/container'
import Layout from '../components/layout'
import Section from '../components/section'

const bannerContent = (
  <Fragment>
    <h1>Page not found</h1>
  </Fragment>
)

export default () => {
  return (
    <Layout bannerContent={bannerContent}>
      <Section>
        <Container>
          <p>Sorry, I've looked everywhere but I can't find that page!</p>
          <img src="/img/404.jpg" alt="404" />
        </Container>
      </Section>
    </Layout>
  )
}
