import { Link, StaticQuery, graphql } from "gatsby"
import React, { CSSProperties, Component } from "react"
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
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem',
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

interface HeaderLinkState {
  hover: boolean
}

class HeaderLink extends Component<HeaderLinkProps, HeaderLinkState> {

  constructor(props: any) {
    super(props)
    this.state = {
      hover: false
    }
  }

  onHoverStart = () => {
    this.setState({
      hover: true
    })
  }

  onHoverEnd = () => {
    this.setState({
      hover: false
    })
  }

  render() {
    let style = {...linkInnerStyle}
    if (this.state.hover) {
      style = {...style, ...hoverPageStyle}
    }
    if (isCurrentPage(this.props.to, this.props.current)) {
      style = {...style, ...currentPageStyle}
    }
    return (
      <Link to={this.props.to} onMouseEnter={this.onHoverStart} onMouseLeave={this.onHoverEnd} style={{ flexGrow: 1, ...style }}>
        {this.props.text}
      </Link>
    )
  }
}

function isCurrentPage(to: string, current: Location | null): boolean {
  return current && (current.pathname == to || current.pathname == to + "/") || false
}

const contactButton: CSSProperties = {
  padding: '8px 0px',
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
