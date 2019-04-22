import { Link, StaticQuery, graphql } from "gatsby"
import React, { CSSProperties } from "react"
import { contentStyle } from "./layout"
import Styling from "./styling";

const linkHostStyle: CSSProperties = {
  marginBottom: 24,
  backgroundColor: Styling.primaryColor,
}

const myStyle: CSSProperties = {
  paddingTop: 12,
  paddingBottom: 12
}

const myLinkStyle: CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem',
  justifySelf: 'start',
  color: Styling.lightTextColor
}

const linkHostInnerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  overflow: "auto",
  whiteSpace: "nowrap",
  marginTop: 0,
  minHeight: 56
}

const linkInnerStyle: CSSProperties = {
  textAlign: "center",
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem',
  minWidth: 160,
  textTransform: 'uppercase',
  fontWeight: 700,
  textDecoration: 'none'
}

interface HeaderLinkProps {
  to: string
  text: string
  current: Location | null
}

const HeaderLink = ({ to, text, current }: HeaderLinkProps) => (
  <Link to={to} style={{ flexGrow: 1 }}>
    <div style={linkInnerStyle}>{dotIfCurrent(to, current) + text}</div>
  </Link>
)

function dotIfCurrent(to: string, current: Location | null): string {
  if (current && (current.pathname == to || current.pathname == to + "/")) {
    return "● "
  } else {
    return ""
  }
}

const contactButton: CSSProperties = {
  padding: '8px 0px',
  borderRadius: 24,
  backgroundColor: Styling.white,
  color: Styling.primaryColor,
  ...linkInnerStyle,
  minWidth: 0
}

const Header = () => {
  return <StaticQuery
    query={graphql`
     query{file(name: {eq: "CV"}) {
      publicURL
      name
    }}
  `}
    render={(query) => {
      const location = typeof window !== `undefined` ? window.location : null
      return (
        <header>
          <div style={{ ...contentStyle, ...myStyle }} className="headlineTop">
            <Link to="/" style={myLinkStyle} className="headlineLink">Hey, I'm Alex Curran.</Link>
            <a href={query.file.publicURL} style={contactButton} className="emphasisBox">CV</a>
            <a href="mailto:aml.curran+website@gmail.com" style={contactButton} className="emphasisBox">Contact</a>
          </div>
          <div style={linkHostStyle} className="emphasisBox">
            <nav style={{ ...contentStyle, ...linkHostInnerStyle }}>
              <HeaderLink to="/portfolio" text="Portfolio" current={location} />
              <HeaderLink to="/talks" text="Talks" current={location} />
              <HeaderLink to="/side-projects" text="On the side" current={location} />
              <HeaderLink to="/articles" current={location} text="Articles" />
              <HeaderLink to="/not-tech" text="Not tech" current={location} />
            </nav>
          </div>
        </header>
      )}}
  />
}

export default Header
