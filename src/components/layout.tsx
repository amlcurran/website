/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, {CSSProperties, ReactNode} from "react"

import Header from "./header"
import "./layout.scss"

interface LayoutProps {
  children: ReactNode
  style?: CSSProperties
}

const Layout = ({ children, style }: LayoutProps) => (
  <>
    <Header />
    <div style={{ ...style}} className="content" >
      <main>{children}</main>
      <footer style={{ marginTop: 16, paddingBottom: 16, scrollSnapAlign: "end" }}>
        ALEX CURRAN © {new Date().getFullYear()}
      </footer>
    </div>
  </>
)

export default Layout
