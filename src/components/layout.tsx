/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { CSSProperties } from "react"

import Header from "./header"
import "./layout.css"
import SEO from "./seo";

interface LayoutProps {
  children: JSX.Element[]
  seo: JSX.Element
  style?: CSSProperties
}

const Layout = ({ children, seo, style }: LayoutProps) => (
  <>
    {seo}
    <Header />
    <div style={{ ...style}} className="content" >
      <main>{children}</main>
      <footer style={{ marginTop: 16, paddingBottom: 16 }}>
        ALEX CURRAN © {new Date().getFullYear()}
      </footer>
    </div>
  </>
)

export default Layout
