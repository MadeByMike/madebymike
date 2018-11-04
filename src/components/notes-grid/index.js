import React from 'react'
import styles from './index.module.css'
import Note from '../note'
import { shapeCard } from '../../helpers/card'

const NotAds = ({ notAds }) => {
  if (!notAds.length) return null
  const introCard = {
    title: 'Not Ads',
    content: `<p>
    A bunch of things I didn't make that I want to promote or share for no
    financial benefit.
  </p>`,
    color: 'transparent',
  }

  return (
    <div className={styles.notAdsGrid}>
      <div>
        <Note data={introCard} className={styles.introCard} />
        {notAds.map(card => {
          return <Note data={{ ...shapeCard(card), type: 'Not Ad' }} />
        })}
      </div>
    </div>
  )
}

export default ({ notAds, cards }) => {
  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesGrid}>
        {cards.map(card => {
          return <Note data={shapeCard(card)} />
        })}
      </div>
      <NotAds notAds={notAds} />
    </div>
  )
}
