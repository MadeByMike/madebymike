import React, { Fragment } from 'react'
import Header from './header'
import Footer from './footer'
import Banner from './banner'

const Layout = ({ children, bannerContent }) => {
  return (
    <Fragment>
      <Header />
      <Banner bannerContent={bannerContent} />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout
