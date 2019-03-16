import { Link } from "gatsby"
import React, { CSSProperties } from "react"
import { contentStyle } from "./layout"

const linkHostStyle: CSSProperties = {
  backgroundColor: `rgb(255, 102, 0)`,
}

const myStyle: CSSProperties = {

}

const linkHostInnerStyle: CSSProperties = {
  display: "flex"
}

interface HeaderLinkProps {
  to: string
  text: string
}

const HeaderLink = ({to, text}: HeaderLinkProps) => (
  <Link to={to} style={{flexGrow: 1}}>
    <div style={{textAlign: "center"}}>{text}</div>
  </Link>
)

const Header = () => (
  <header>
    <div style={{...contentStyle, ...myStyle}}>I am Alex Curran.</div>
    <div style={linkHostStyle}>
      <div style={{...contentStyle, ...linkHostInnerStyle}}>
        <HeaderLink to="/" text="Home" />
        <HeaderLink to="/portfolio" text="Portfolio" />
        <HeaderLink to="/talks" text="Talks" />
        <HeaderLink to="/not-tech" text="Not tech" />
        <a href="https://www.medium.com/@amlcurran" style={{flexGrow: 1}} target="_blank">Blog</a>
      </div>
    </div>
  </header>
)

export default Header
