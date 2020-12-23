/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { CSSProperties } from "react"

import Header from "./Header"
import "./layout.css"
import SEO from "./seo";

interface LayoutProps {
  children: JSX.Element[]
  seo: SEO
  style?: CSSProperties
}

export const contentStyle: CSSProperties = {
  maxWidth: 960,
  marginLeft: "auto",
  marginRight: "auto",
  padding: "0px 1.0875rem 0px 1.0875rem"
}

const Layout = ({ children, seo, style }: LayoutProps) => (
  <>
    {seo}
    <Header />
    <div style={{...contentStyle, ...style}} >
      <main>{children}</main>
      <footer style={{ marginTop: 16, paddingBottom: 16 }}>
        ALEX CURRAN © {new Date().getFullYear()}
      </footer>
    </div>
  </>
)

export default Layout
