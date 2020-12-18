import React, { CSSProperties } from "react"
import { Link } from "@reach/router";
import { Url } from "url";
import Styling from "./styling";
import "./layout.css"

const cardStyle: CSSProperties = {
  minWidth: 250,
  flexGrow: 1,
  flexBasis: 0,
  marginTop: 24,
  marginBottom: 16,
  background: Styling.cardBackground,
  borderRadius: Styling.card.cornerRadius
}

const frontPageCard: CSSProperties = {
  ...cardStyle,
  padding: 12
}

const cardTitle: CSSProperties = {
  color: Styling.primaryColor
}

const linkStyle: CSSProperties = {
  textDecoration: 'none'
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
    <div style={{ ...frontPageCard, margin: 16 }}>
      <Link to={props.goesTo} style={linkStyle}>
        <h1 style={{ ...cardTitle }} className={classNames}>{props.title}</h1>
        <p>{props.text}</p>
      </Link>
    </div>
  )
}

export const LargeTitledExternalLinkCard = (props: LinkCardProps) => (
  <div style={{ ...frontPageCard, margin: 16 }} className="card">
    <a href={props.goesTo} style={linkStyle} target="_blank">
      <h1 style={cardTitle}>{props.title}</h1>
      <p>{props.text}</p>
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
      <h2 className="in-card">{props.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}

export const SmallCard = (props: LargeCardProps & Linkable) => {
  return (
    <Link to={props.url}>
      <LargeCard {...props} />
    </Link>
  )
}

interface LargeCardProps {
  title: string
  date: string
  html: string
  with: string
  link: string
  image: JSX.Element
  largeImage: boolean
}

export const LargeCard = (props: LargeCardProps) => {
  const clazz = props.largeImage ? "portfolio-image-large" : "portfolio-image"
  const date2 = props.date.length > 0 ? (<h4>{props.date}</h4>) : undefined
  const withText = props.with.length > 0 ? (<h4 style={{ color: Styling.primaryColor }}>with {props.with}</h4>) : undefined
  return (
    <div style={cardStyle} className="card">
      <div style={{ display: 'flex' }} className="card-internal">
        <div className={clazz}>{props.image}</div>
        <div style={{ marginLeft: 24 }}>
          <div style={{ marginTop: 16 }}>
            <h2 style={{ marginBottom: 0 }} className="in-card" >{props.title}</h2>
            {[withText, date2]}
          </div>
          <div style={{ paddingRight: 16, marginTop: 16 }} dangerouslySetInnerHTML={{ __html: props.html }} />
        </div>
      </div>
    </div>
  )
}
export default LargeTitledLinkCard