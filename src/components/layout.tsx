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
  seo: SEO
}

export const contentStyle: CSSProperties = {
  maxWidth: 960,
  marginLeft: "auto",
  marginRight: "auto",
  padding: "0px 1.0875rem 0px 1.0875rem"
}

const Layout = ({ children, seo }: LayoutProps) => (
  <>
    {seo}
    <Header />
    <div
      style={contentStyle}
    >
      <main>{children}</main>
      <footer style={{ marginTop: 32 }}>
        © {new Date().getFullYear()}, Built with
            {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  </>
)

export default Layout
