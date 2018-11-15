import React from 'react'
import { Helmet } from 'react-helmet'

const Header = () => {
  const pageTitle = `MadeByMike - Mike Riethmuller`
  const description = 'A pretty good web developer.'
  const criticalCSS = ''
  const rssLink = 'https://madebymike.com.au/rss.xml'
  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />

      <title>{pageTitle}</title>

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@MikeRiethmuller" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:creator" content="@MikeRiethmuller" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://madebymike.com.au/img/mug/mike.jpg" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/img/mug/mike.jpg" />
      <meta property="og:url" content="https://madebymike.com.au" />
      <meta property="og:site_name" content={pageTitle} />

      <link
        href={rssLink}
        rel="alternate feed"
        type="application/rss+xml"
        title={pageTitle}
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF6E4A" />
      <meta name="theme-color" content="#FF6E4A" />
    </Helmet>
  )
}

export default Header
