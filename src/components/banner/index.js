import React from 'react'
import Navigation from '../navigation'
import styles from './index.module.scss'
import Container from '../container'
import Section from '../section'

const Banner = ({ bannerContent }) => {
  return (
    <header className={styles.banner}>
      <Navigation />
      <Section className={styles.bannerHeader}>
        <Container>{bannerContent}</Container>
      </Section>
    </header>
  )
}

export default Banner
