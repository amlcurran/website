import { Link } from "gatsby"
import React, { CSSProperties } from "react"
import { contentStyle } from "./layout"

const linkHostStyle: CSSProperties = {
  backgroundColor: `rgb(255, 102, 0)`,
}

const myStyle: CSSProperties = {
  fontSize: 32,
  paddingTop: 12,
  paddingBottom: 12,
  fontFamily: 'sans-serif'
}

const linkHostInnerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginTop: 0,
  marginBottom: 12,
  minHeight: 56
}

const linkInnerStyle: CSSProperties = {
  textAlign: "center",
}

const externalLinkStyle: CSSProperties = {
  flexGrow: 1, 
  textAlign: "center"
}

interface HeaderLinkProps {
  to: string
  text: string
}

const HeaderLink = ({to, text}: HeaderLinkProps) => (
  <Link to={to} style={{flexGrow: 1}}>
    <div style={linkInnerStyle}>{text}</div>
  </Link>
)

const Header = () => (
  <header>
    <div style={{...contentStyle, ...myStyle}}>I am Alex Curran.</div>
    <div style={linkHostStyle} className="emphasisBox">
      <div style={{...contentStyle, ...linkHostInnerStyle}}>
        <HeaderLink to="/" text="Home" />
        <HeaderLink to="/portfolio" text="Portfolio" />
        <HeaderLink to="/talks" text="Talks" />
        <HeaderLink to="/not-tech" text="Not tech" />
        <a href="https://www.medium.com/@amlcurran" style={externalLinkStyle} target="_blank">Blog</a>
      </div>
    </div>
  </header>
)

export default Header
