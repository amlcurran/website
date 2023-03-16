import {Link, graphql, useStaticQuery} from "gatsby"
import React, { CSSProperties, useEffect, useState } from "react"
import Styling from "./styling";
import {Icon} from "./card"
import {ContactButton} from "./ContactButton";

const linkHostStyle: CSSProperties = {
  backgroundColor: Styling.primaryColor,
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

  return (
    <Link to={props.to} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ flexGrow: 1, ...style }} className="inner-link">
      {props.text}
    </Link>
  )
}

function isCurrentPage(to: string, current: Location | null): boolean {
  return current && (current.pathname == to || current.pathname == to + "/") || false
}

const Header = () => {
  const location = typeof window !== `undefined` ? window.location : null
  const query = useStaticQuery(graphql`
     query{file(name: {eq: "CV-web"}) {
      publicURL
      name
    }}
  `)
  return (
    <header style={{scrollSnapAlign: "start"}}>
      <div className="content headlineTop">
        <Link to="/" className="headlineLink" style={{color: Styling.secondaryColor}}>Hey, I'm Alex Curran.</Link>
        <ContactButton url={query.file.publicURL} text="CV" icon={"file_download"}/>
        <ContactButton url="mailto:aml.curran+website@gmail.com" text="Contact" icon={"email"}/>
      </div>
      <div style={linkHostStyle}>
        <nav style={linkHostInnerStyle} className="emphasisBox content scroll-container">
          <HeaderLink2 to="/portfolio" text="Portfolio" current={location}/>
          <HeaderLink2 to="/talks" text="Talks" current={location}/>
          <HeaderLink2 to="/side-projects" text="On the side" current={location}/>
          <HeaderLink2 to="/articles" current={location} text="Articles"/>
          <HeaderLink2 to="/not-tech" text="Not tech" current={location}/>
          {/*<HeaderLink2 to="/twitter-archive" text="Tweets" current={location} />*/}
        </nav>
      </div>
    </header>
  )
}

export default Header
