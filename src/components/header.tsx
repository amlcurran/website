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
  current: Location
}

const HeaderLink = ({to, text, current}: HeaderLinkProps) => (
  <Link to={to} style={{flexGrow: 1}}>
    <div style={linkInnerStyle}>{dotIfCurrent(to, current) + text}</div>
  </Link>
)

function dotIfCurrent(to: string, current: Location): string {
  if (current.href.endsWith(to)) {
    return "● "
  } else {
    return ""
  }
}

const Header = () => (
  <header>
    <div style={{...contentStyle, ...myStyle}}>I am Alex Curran.</div>
    <div style={linkHostStyle} className="emphasisBox">
      <div style={{...contentStyle, ...linkHostInnerStyle}}>
        <HeaderLink to="/" text="Home" current={window.location} />
        <HeaderLink to="/portfolio" text="Portfolio" current={window.location} />
        <HeaderLink to="/talks" text="Talks" current={window.location} />
        <HeaderLink to="/not-tech" text="Not tech" current={window.location} />
        <a href="https://www.medium.com/@amlcurran" style={externalLinkStyle} target="_blank">⎋ Blog</a>
      </div>
    </div>
  </header>
)

export default Header
