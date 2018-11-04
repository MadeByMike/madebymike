import React from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

export default ({ children, className }) => (
  <aside className={cx(styles.aside, className)}>{children}</aside>
)
