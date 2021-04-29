import { Link, StaticQuery, graphql } from "gatsby"
import React, { CSSProperties, useEffect, useState } from "react"
import { contentStyle } from "./layout"
import Styling from "./styling";

const linkHostStyle: CSSProperties = {
  backgroundColor: Styling.primaryColor,
}

const myStyle: CSSProperties = {
  paddingTop: 12,
  paddingBottom: 12
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
  letterSpacing: '0.1rem',
  minWidth: 160,
  textTransform: 'uppercase',
  fontWeight: 700,
  marginLeft: 4,
  marginRight: 4,
  textDecoration: 'none',
  transition: 'background 0.2s',
  paddingTop: 8,
  paddingBottom: 8,
  borderRadius: 24
}

const currentPageStyle: CSSProperties = {
  backgroundColor: Styling.bigButtons.background,
  color: Styling.primaryColor,
}

const hoverPageStyle: CSSProperties = {
  backgroundColor: Styling.bigButtonHover.background,
  color: Styling.bigButtonHover.color
}

interface HeaderLinkProps {
  to: string
  text: string
  current: Location | null
}

function HeaderLink2(props: HeaderLinkProps) {
  const [hover, setHover] = useState(false)
  let style = {...linkInnerStyle}
  if (hover) {
    style = {...style, ...hoverPageStyle}
  }
  if (isCurrentPage(props.to, props.current)) {
    style = {...style, ...currentPageStyle}
  }

  const fieldRef = React.useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (isCurrentPage(props.to, props.current) && fieldRef?.current) {
      fieldRef.current.scrollIntoView({ block: "nearest", inline: "end", behavior: "smooth" })
    }
  }, [])
  return (
    <Link to={props.to} ref={fieldRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ flexGrow: 1, ...style }}>
      {props.text}
    </Link>
  )
}

function isCurrentPage(to: string, current: Location | null): boolean {
  return current && (current.pathname == to || current.pathname == to + "/") || false
}

const contactButton: CSSProperties = {
  padding: '10px 0px',
  borderRadius: 24,
  backgroundColor: Styling.bigButtons.background,
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
            <Link to="/" className="headlineLink headline" style={{ color: Styling.secondaryColor }}>Hey, I'm Alex Curran.</Link>
            <a href={query.file.publicURL} style={contactButton} className="emphasisBox">CV <span className="material-icons" style={{ verticalAlign: "text-bottom" }}>file_download</span></a>
            <a href="mailto:aml.curran+website@gmail.com" style={contactButton} className="emphasisBox">Contact <span className="material-icons"  style={{ verticalAlign: "text-bottom" }}>email
</span></a>
          </div>
          <div style={linkHostStyle} >
            <nav style={{ ...contentStyle, ...linkHostInnerStyle }} className="emphasisBox">
              <HeaderLink2 to="/portfolio" text="Portfolio" current={location} />
              <HeaderLink2 to="/talks" text="Talks" current={location} />
              <HeaderLink2 to="/side-projects" text="On the side" current={location} />
              <HeaderLink2 to="/articles" current={location} text="Articles" />
              <HeaderLink2 to="/not-tech" text="Not tech" current={location} />
            </nav>
          </div>
        </header>
      )}}
  />
}

export default Header
