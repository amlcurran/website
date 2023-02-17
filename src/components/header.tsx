import { Link, StaticQuery, graphql } from "gatsby"
import React, { CSSProperties, useEffect, useState } from "react"
import Styling from "./styling";
import {Icon} from "./card"

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
  marginTop: 0,
  minHeight: 56
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
  let style = {}
  if (hover) {
    style = {...hoverPageStyle}
  }
  if (isCurrentPage(props.to, props.current)) {
    style = {...currentPageStyle}
  }

  const fieldRef = React.useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (isCurrentPage(props.to, props.current) && fieldRef?.current) {
      fieldRef.current.scrollIntoView({ block: "nearest", inline: "end", behavior: "smooth" })
    }
  }, [])
  return (
    <Link to={props.to} ref={fieldRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ flexGrow: 1, ...style }} className="inner-link">
      {props.text}
    </Link>
  )
}

function isCurrentPage(to: string, current: Location | null): boolean {
  return current && (current.pathname == to || current.pathname == to + "/") || false
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
        <header style={{scrollSnapAlign: "start"}}>
          <div style={myStyle} className="content headlineTop">
            <Link to="/" className="headlineLink" style={{ color: Styling.secondaryColor }}>Hey, I'm Alex Curran.</Link>
            <ContactButton url={query.file.publicURL} text="CV" icon={"file_download"} />
            <ContactButton url="mailto:aml.curran+website@gmail.com" text="Contact" icon={"email"} />
          </div>
          <div style={linkHostStyle} >
            <nav style={linkHostInnerStyle} className="emphasisBox content scroll-container">
              <HeaderLink2 to="/portfolio" text="Portfolio" current={location} />
              <HeaderLink2 to="/talks" text="Talks" current={location} />
              <HeaderLink2 to="/side-projects" text="On the side" current={location} />
              <HeaderLink2 to="/articles" current={location} text="Articles" />
              <HeaderLink2 to="/not-tech" text="Not tech" current={location} />
              {/*<HeaderLink2 to="/twitter-archive" text="Tweets" current={location} />*/}
            </nav>
          </div>
        </header>
      )}}
  />
}

const ContactButton = ({url, text, icon}: {url: string, text: string, icon: Icon}) => (
    <a href={url} className="emphasisBox inner-link contact-button">
      <span>{text}</span>
      <span className="material-icons-round" style={{ verticalAlign: "middle", paddingBottom: -2, paddingLeft: 4 }}>{icon}</span>
    </a>
)

export default Header
