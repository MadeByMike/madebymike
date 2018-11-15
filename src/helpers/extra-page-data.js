import Helmet from 'react-helmet'
import get from 'lodash/get'
import React from 'react'

export const getExtraCSS = extraCss => {
  if (extraCss && extraCss.length) {
    return (
      <Helmet>
        {extraCss.map(css => {
          return (
            <link
              key={get(css, 'file.url')}
              rel="stylesheet"
              href={get(css, 'file.url')}
            />
          )
        })}
      </Helmet>
    )
  }
  return null
}

export const getExtraJS = extraJs => {
  if (extraJs && extraJs.length) {
    return (
      <Helmet>
        {extraJs.map(js => {
          return (
            <script
              key={get(js, 'file.url')}
              type="text/javascript"
              src={get(js, 'file.url')}
            />
          )
        })}
      </Helmet>
    )
  }
  return null
}
