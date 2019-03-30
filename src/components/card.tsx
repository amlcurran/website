import React, { CSSProperties } from "react"
import { Link } from "@reach/router";

const cardStyle: CSSProperties = {
  minWidth: 250,
  flexGrow: 1,
  flexBasis: 0,
  margin: 12,
  minHeight: 200,
  background: 'white',
  padding: 12
}

const cardTitle: CSSProperties = {
  color: "#FF5900",
  fontSize: 56,
}

const cardText: CSSProperties = {
  color: "#242935"
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
  const additionalTitleStyle: CSSProperties = props.doNotWrapTitle ? { whiteSpace: "nowrap" } : {}
  return (
    <div style={cardStyle}>
      <Link to={props.goesTo} style={linkStyle}>
        <h1 style={{ ...cardTitle, ...additionalTitleStyle }}>{props.title}</h1>
        <div style={cardText}>{props.text}</div>
      </Link>
    </div>
  )
}

export const BlogCard = (props: CardProps) => (
  <div style={cardStyle}>
    <a href={props.goesTo} style={linkStyle}>
      <h1 style={cardTitle}>{props.title}</h1>
      <div style={cardText}>{props.text}</div>
    </a>
  </div>
)

export const ContactCard = () => (
  <div style={cardStyle}>
    <h1 style={cardTitle}>Contact</h1>
    <div style={cardText}>Want to chat about something? Then get in touch</div>
  </div>
)

export default Card