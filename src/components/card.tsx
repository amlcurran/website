import React, { CSSProperties } from "react"
import { Link } from "@reach/router";
import Styling from "./styling";

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