import { Link } from "gatsby"
import React from "react"
import { CSSProperties } from "react"

const frontPageCard: CSSProperties = {
    // ...cardStyle
}

interface LinkCardProps {
    title: string
    text: string
    goesTo: string
}

const FrontPageCard = (props: LinkCardProps) => {
    return (
      <div style={{ ...frontPageCard}} className="front-page-card">
        <Link to={props.goesTo}>
          <h1>{props.title}</h1>
          <p>{props.text}</p>
        </Link>
      </div>
    )
  }
  
export const ExternalLinkFrontPageCard = (props: LinkCardProps) => (
    <div style={{ ...frontPageCard}} className="front-page-card">
        <a href={props.goesTo} target="_blank">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </a>
    </div>
)

export default FrontPageCard
