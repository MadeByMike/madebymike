import Parser from 'html-react-parser'
import React from 'react'
import Section from '../section'
import classNames from 'classnames/bind'
import styles from './index.module.css'

const cx = classNames.bind(styles)

export const HTML = ({ content, className }) => (
  <div
    className={cx(className)}
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />
)

const Aside = ({ content }) => {
  if (!content) return null
  return <aside className={styles.aside}>{Parser(content)}</aside>
}

const Update = ({ content }) => {
  if (!content) return null
  return (
    <div className={styles.update}>
      <strong>Update:</strong>
      {Parser(content)}
    </div>
  )
}

export const Post = ({ content, update, aside, wide, className }) => {
  return (
    <Section>
      <div className={cx({ container: true, containerWide: wide, className })}>
        <Update content={update} />
        {Parser(content)}
        <Aside content={aside} />
      </div>
    </Section>
  )
}

export default ({ children, wide }) => (
  <div className={cx({ container: true, containerWide: wide })}>{children}</div>
)
