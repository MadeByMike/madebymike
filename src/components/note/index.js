import React, { Component } from 'react'

import IconBook from '../icons/book'
import IconCodepen from '../icons/codepen'
import IconLink from '../icons/link'
import IconList from '../icons/list'
import IconVideo from '../icons/video'
import classNames from 'classnames/bind'
import get from 'lodash/get'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

class Note extends Component {
  constructor(props) {
    super(props)
    this.renderIcon = this.renderIcon.bind(this)
  }

  componentDidMount() {
    const links = this.noteBody.querySelectorAll('li a')
    links.forEach(link => {
      const prepend = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      )
      prepend.setAttribute('class', 'link-check')
      prepend.setAttribute('viewBox', '0 0 640 480')
      prepend.innerHTML =
        '<path d="M36 268l138 161c70-144 157-276 295-401-104 58-218 169-316 307L36 268z"/>'
      link.insertBefore(prepend, link.firstChild)
    })
  }

  renderIcon() {
    const { data } = this.props
    const { type } = data
    if (type === 'Pen') {
      return <IconCodepen />
    } else if (type === 'Video') {
      return <IconVideo />
    } else if (type === 'External') {
      return <IconLink />
    } else if (type === 'Writing') {
      return <IconBook />
    } else if (type === 'List') {
      return <IconList />
    }
  }

  render() {
    const { data, className } = this.props
    const {
      color,
      content,
      title,
      dateString,
      tags,
      size,
      url,
      image,
      meta,
    } = data

    return (
      <div
        className={`${cx({
          note: true,
          [`note${color || 'grey'}`]: true,
          noteBlockLink: url,
          [`noteSize${size}`]: size,
        })} ${className ? className : ''}`}
      >
        {url && <a className={styles.noteLinkOverlay} href={url} />}

        <div className={styles.noteInner}>
          <div className={cx(styles.noteHeader, styles.noteHeaderLogo)}>
            {this.renderIcon()}
            <h2 className={styles.noteTitle}>{title}</h2>
          </div>

          <div className={cx(styles.noteBody)}>
            <div
              ref={ref => {
                this.noteBody = ref
              }}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            {image && (
              <p>
                <img alt={get(image, 'alt')} src={get(image, 'url')} />
              </p>
            )}
            {meta && (
              <div className={styles.noteMeta}>
                <time className={styles.noteMetaDate}>{dateString}</time>
                {tags &&
                  tags.map(tag => {
                    return <span className={styles.noteMetaTag}>{tag}</span>
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Note
