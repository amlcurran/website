import { Link } from "gatsby"
import React, { CSSProperties } from "react"
import { contentStyle } from "./layout"
import Styling from "./styling";

const linkHostStyle: CSSProperties = {
  backgroundColor: Styling.primaryColor,
}

const myStyle: CSSProperties = {
  fontSize: 32,
  paddingTop: 12,
  paddingBottom: 12,
  fontWeight: 700,
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem'
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
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem'
}

const externalLinkStyle: CSSProperties = {
  flexGrow: 1,
  ...linkInnerStyle
}

interface HeaderLinkProps {
  to: string
  text: string
  current: Location
}

const HeaderLink = ({ to, text, current }: HeaderLinkProps) => (
  <Link to={to} style={{ flexGrow: 1 }}>
    <div style={linkInnerStyle}>{dotIfCurrent(to, current) + text}</div>
  </Link>
)

function dotIfCurrent(to: string, current: Location): string {
  if (current && current.href.endsWith(to)) {
    return "● "
  } else {
    return ""
  }
}

const Header = () => {
  const location = typeof window !== `undefined` ? window.location : null
  return (
    <header>
      <div style={{ ...contentStyle, ...myStyle }}>Hey, I'm Alex Curran.</div>
      <div style={linkHostStyle} className="emphasisBox">
        <div style={{ ...contentStyle, ...linkHostInnerStyle }}>
          <HeaderLink to="/" text="Home" current={location} />
          <HeaderLink to="/portfolio" text="Portfolio" current={location} />
          <HeaderLink to="/talks" text="Talks" current={location} />
          <HeaderLink to="/not-tech" text="Not tech" current={location} />
          <a href="https://www.medium.com/@amlcurran" style={externalLinkStyle} target="_blank">⎋ Blog</a>
        </div>
      </div>
    </header>
  )
}

export default Header
