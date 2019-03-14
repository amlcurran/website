import { Link } from "gatsby"
import React, { CSSProperties } from "react"
import { contentStyle } from "./layout"

interface HeaderProps {
  siteTitle: string
}

const linkHostStyle: CSSProperties = {
  backgroundColor: `rgb(255, 102, 0)`,
}

const myStyle: CSSProperties = {

}

const linkHostInnerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-evenly"
}

const Header = ({ siteTitle }: HeaderProps) => (
  <header>
    <div style={{...contentStyle, ...myStyle}}>I am Alex Curran.</div>
    <div style={linkHostStyle}>
      <div style={{...contentStyle, ...linkHostInnerStyle}}>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/talks">Talks</Link>
        <Link to="/not-tech">Not tech</Link>
        <a href="https://www.medium.com/@amlcurran" target="_blank">Blog</a>
      </div>
    </div>
  </header>
)

export default Header
