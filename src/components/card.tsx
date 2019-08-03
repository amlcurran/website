import React, { CSSProperties } from "react"
import { Link } from "@reach/router";
import Styling from "./styling";
import "./layout.css"

const cardStyle: CSSProperties = {
  minWidth: 250,
  flexGrow: 1,
  flexBasis: 0,
  marginTop: 16,
  marginBottom: 16,
  minHeight: 200,
  background: 'white',
  padding: 12,
  borderRadius: Styling.card.cornerRadius
}

const cardTitle: CSSProperties = {
  color: Styling.primaryColor,
  fontSize: 56,
}

const cardText: CSSProperties = {
  color: Styling.secondaryColor
}

const linkStyle: CSSProperties = {
  textDecoration: 'none'
}

const badgeHostStyle: CSSProperties = {
  display: "flex",
  backgroundColor: Styling.primaryColor,
  paddingBottom: 8,
  marginLeft: -12,
  marginRight: -12,
  marginBottom: -12,
  marginTop: -48,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4
}

interface LinkCardProps {
  title: string
  text: string
  goesTo: string
  doNotWrapTitle?: boolean
}

interface Linkable {
  url: string
}

const LargeTitledLinkCard = (props: LinkCardProps) => {
  const classNames = props.doNotWrapTitle ? "on-the-side" : ""
  return (
    <div style={{ ...cardStyle, margin: 16 }}>
      <Link to={props.goesTo} style={linkStyle}>
        <h1 style={{ ...cardTitle }} className={classNames}>{props.title}</h1>
        <p style={cardText}>{props.text}</p>
      </Link>
    </div>
  )
}

export const LargeTitledExternalLinkCard = (props: LinkCardProps) => (
  <div style={{ ...cardStyle, margin: 16 }} className="card">
    <a href={props.goesTo} style={linkStyle} target="_blank">
      <h1 style={cardTitle}>{props.title}</h1>
      <p style={cardText}>{props.text}</p>
    </a>
  </div>
)

interface BasicHtmlCardProps {
  title: string
  html: string
}

export const BasicHtmlCard = (props: BasicHtmlCardProps) => {
  return (
    <div style={cardStyle}>
      <h2>{props.title}</h2>
      <p style={cardText} dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}

export const SmallCard = (props: BasicHtmlCardProps & Linkable) => {
  return (
    <Link to={props.url}>
      <div style={{ ...cardStyle, minHeight: 0 }}>
        <h3>{props.title}</h3>
        <p style={cardText} dangerouslySetInnerHTML={{ __html: props.html }} />
      </div>
    </Link>
  )
}

interface LargeCardProps {
  title: string
  date: string
  html: string
  with: string
  badges?: JSX.Element[]
  image: JSX.Element
}

export const LargeCard = (props: LargeCardProps) => {
  return (
    <div style={cardStyle} className="card">
      <div style={{ display: 'flex' }} className="card-internal">
        <div>
          <div style={{ marginBottom: 24 }}>
            <h4>{props.date}</h4>
            <h2 style={{ marginBottom: 0 }}>{props.title}</h2>
            <h4 style={{ color: Styling.primaryColor }}>with {props.with}</h4>
          </div>
          <div style={{ paddingBottom: 48, paddingRight: 16 }} dangerouslySetInnerHTML={{ __html: props.html }} />
        </div>
        <div className="portfolio-image">{props.image}</div>
      </div>
      <div style={badgeHostStyle}>{props.badges}</div>
    </div>
  )
}
export default LargeTitledLinkCard