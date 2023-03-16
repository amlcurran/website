import React, {CSSProperties} from "react"
import Styling from "./styling"
import "./layout.scss"
import {CardTextProps} from "./smallCard";


export type Icon = "launch" | "play_circle_outline" | "email" | "file_download" | "mail_outline"

interface LargeCardProps extends CardTextProps, Anchorable {
  link?: string
  belowTitle?: JSX.Element
  image?: JSX.Element
  imageSize: 'normal' | 'large'
  imageOnRight?: boolean
  style?: CSSProperties
}

interface Anchorable {
  id?: string
}

function imageClasses(props: LargeCardProps): string {
  return props.imageSize == 'large' ? "portfolio-image-large" : "portfolio-image"
}

export const LargeCard = (props: LargeCardProps) => {
  const subtitle = (props.subtitle?.length || 0) > 0 ? (<h4>{props.subtitle}</h4>) : undefined
  const image = props.image ? <aside className={imageClasses(props)}>{props.image}</aside> : undefined
  const classes = props.link ? "hover-background " : " "
  const title = props.link ?
      <a href={props.link}><h2>{props.title}<span className="material-icons-round" style={{paddingLeft: 8}}>launch</span></h2>
      </a> : <h2>{props.title}</h2>
  return (
      <section style={props.style} id={props.id} className={"card-internal card-total " + classes}>
        {props.imageOnRight ? <></> : image}
        <div className="article-text">
          {title}
          {subtitle}{props.belowTitle}
          <p dangerouslySetInnerHTML={{__html: props.text}} className="no-links"/>
        </div>
        {props.imageOnRight ? image : <></>}
      </section>
  )
}
