import React from 'react'
import IconCodepen from '../icons/codepen'
import IconTwitter from '../icons/twitter'
import IconGithub from '../icons/github'
import styles from './index.module.css'
const Footer = () => {
  return (
    <footer>
      <ul className={styles.footerList}>
        <li>
          <a className={styles.footerLink} href="http://codepen.io/MadeByMike/">
            <IconCodepen width={32} height={32} />
          </a>
        </li>
        <li>
          <a
            className={styles.footerLink}
            href="https://twitter.com/MikeRiethmuller"
          >
            <IconTwitter width={32} height={32} />
          </a>
        </li>
        <li>
          <a className={styles.footerLink} href="https://github.com/MadeByMike">
            <IconGithub width={32} height={32} />
          </a>
        </li>
        <div />
      </ul>
    </footer>
  )
}

export default Footer
