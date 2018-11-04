import React from 'react'
import cx from 'classnames'
import styles from './index.module.css'

export default ({ children, className }) => (
  <div className={cx(styles.section, className)}>{children}</div>
)
