import React from 'react'
import { Link } from 'gatsby'
import styles from './index.module.scss'

export default () => (
  <nav className={styles.navigationContainer}>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link className={styles.navigationLink} to="/">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link className={styles.navigationLink} to="/writing/">
          Writing
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link className={styles.navigationLink} to="/hire-me/">
          Hire Me
        </Link>
      </li>
    </ul>
  </nav>
)
