import React, { CSSProperties } from "react"
import { Link } from "@reach/router";
import Styling from "./styling";
import "./layout.css"
import Badge from "./badge";

const cardStyle: CSSProperties = {
  minWidth: 250,
  flexGrow: 1,
  flexBasis: 0,
  margin: 16,
  minHeight: 200,
  background: 'white',
  padding: 12,
  borderRadius: 4
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

interface CardProps {
  title: string
  text: string
  goesTo: string
  doNotWrapTitle?: boolean
}

const Card = (props: CardProps) => {
  const classNames = props.doNotWrapTitle ? "on-the-side" : ""
  return (
    <div style={cardStyle}>
      <Link to={props.goesTo} style={linkStyle}>
        <h1 style={{ ...cardTitle }} className={classNames}>{props.title}</h1>
        <div style={cardText}>{props.text}</div>
      </Link>
    </div>
  )
}

interface SmallCardProps {
  title: string
  html: string
}

export const SmallCard = (props: SmallCardProps) => {
  return (
    <div style={cardStyle}>
      <h2>{props.title}</h2>
      <div style={cardText} dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}

interface LargeCardProps {
  title: string
  date: string
  html: string
  with: string
  badges?: JSX.Element[]
}

export const LargeCard = (props: LargeCardProps) => {
  return (
    <div style={cardStyle} className="card">
      <div style={{ display: 'flex', marginBottom: 24 }}>
        <div style={{ flexGrow: 1 }}>
          <h5>{props.date}</h5>
          <h2 style={{ marginBottom: 0 }}>{props.title}</h2>
          <h5 style={{ color: Styling.primaryColor }}>with {props.with}</h5>
        </div>
        {props.badges}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}

export const ExternalLinkCard = (props: CardProps) => (
  <div style={cardStyle} className="card">
    <a href={props.goesTo} style={linkStyle} target="_blank">
      <h1 style={cardTitle}>{props.title}</h1>
      <div style={cardText}>{props.text}</div>
    </a>
  </div>
)

export const ContactCard = () => (
  <div style={cardStyle} className="card">
    <h1 style={cardTitle}>Contact</h1>
    <div style={cardText}>Want to chat about something? Then get in touch</div>
  </div>
)

export default Card