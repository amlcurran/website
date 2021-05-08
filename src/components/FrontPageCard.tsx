import { Link } from "gatsby"
import React from "react"
import { CSSProperties } from "react"
import { cardStyle } from "./card"

const frontPageCard: CSSProperties = {
    ...cardStyle,
    padding: 12
}

interface LinkCardProps {
    title: string
    text: string
    goesTo: string
    doNotWrapTitle?: boolean
}

const FrontPageCard = (props: LinkCardProps) => {
    const classNames = props.doNotWrapTitle ? "on-the-side" : ""
    return (
      <div style={{ ...frontPageCard, marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 8 }}>
        <Link to={props.goesTo}>
          <h1 className={classNames}>{props.title}</h1>
          <p>{props.text}</p>
        </Link>
      </div>
    )
  }
  
export const ExternalLinkFrontPageCard = (props: LinkCardProps) => (
    <div style={{ ...frontPageCard, marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 8 }}>
        <a href={props.goesTo} target="_blank">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </a>
    </div>
)

export default FrontPageCard
