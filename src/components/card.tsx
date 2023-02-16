import React, {CSSProperties} from "react"
import Styling from "./styling"
import "./layout.scss"


export type Icon = "launch" | "play_circle_outline" | "email" | "file_download" | "mail_outline"

interface LargeCardProps {
  title: string
  body: string
  subhead2?: string
  subhead1?: string
  link?: string
  belowTitle?: JSX.Element
  image?: JSX.Element
  imageSize: 'normal' | 'large'
  imageOnRight?: boolean
  hover?: boolean
  style?: CSSProperties
}

function imageClasses(props: LargeCardProps): string {
  return props.imageSize == 'large' ? "portfolio-image-large" : "portfolio-image"
}

export const LargeCard = (props: LargeCardProps) => {
  const subhead1 = (props.subhead1?.length || 0) > 0 ? (<h4 style={{ color: Styling.primaryColor }}>{props.subhead1}</h4>) : undefined
  const subhead2 = (props.subhead2?.length || 0) > 0 ? (<h4>{props.subhead2}</h4>) : undefined
  const image = props.image ? <aside className={imageClasses(props)}>{props.image}</aside> : undefined
  const classes = props.hover ? "hover-background " : " "
  const title = props.link ?
      <a href={props.link}><h2>{props.title}<span className="material-icons-round" style={{paddingLeft: 8}}>launch</span></h2>
      </a> : <h2>{props.title}</h2>
  return (
      <section style={props.style} className={"card-internal card-total " + classes}>
        {props.imageOnRight ? <></> : image}
        <div className="article-text">
          {title}
          {subhead1}{subhead2}{props.belowTitle}
          <p dangerouslySetInnerHTML={{__html: props.body}} className="no-links"/>
        </div>
        {props.imageOnRight ? image : <></>}
      </section>
  )
}