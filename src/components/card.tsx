import React, {CSSProperties} from "react"
import {Link} from "@reach/router"
import Styling from "./styling"
import "./layout.css"

export const cardStyle: CSSProperties = {
  minWidth: 250,
  flexGrow: 1,
  flexBasis: 0,
  marginTop: 16,
  marginBottom: 16,
  paddingRight: 16
}

interface Linkable {
  url: string
}

export const LinkedItem = (props: LargeCardProps & Linkable) => {
  const newProps = {...props, hover: true}
  return (
    <Link to={props.url}>
      <Item {...newProps} />
    </Link>
  )
}

export interface Icon {
  name: "launch" | "play_circle_outline"
}

interface LargeCardProps {
  title: string
  html: string
  date?: string
  with?: string
  link?: string
  belowTitle?: JSX.Element
  image?: JSX.Element
  imageSize: 'small' | 'normal' | 'large'
  icon?: Icon
  imageOnRight?: boolean
  hover?: boolean
  className?: string
  style?: CSSProperties
}

function imageClasses(props: LargeCardProps): string {
  const margins = props.imageOnRight ? "margin-left" : "margin-right"
  const className = props.imageSize == 'large' ? "portfolio-image-large" : (props.imageSize == 'small' ? "portfolio-image-small" : "portfolio-image")
  return [margins, className].join(" ")
}

export const Item = (props: LargeCardProps) => {
  const date2 = (props.date?.length || 0) > 0 ? (<h4>{props.date}</h4>) : undefined
  const withText = (props.with?.length || 0) > 0 ? (<h4 style={{ color: Styling.primaryColor }}>with {props.with}</h4>) : undefined
  const image = props.image ? <div className={imageClasses(props)}>{props.image}</div> : undefined
  const icon = props.icon ? <span className="material-icons" style={{paddingLeft: 8}}>{props.icon.name}</span> : undefined
  let classes = props.hover ? "hover-background " : " "
  classes += props.className || ""
  const title = props.icon?.positionAfterTitle ? <h2>{props.title}{icon}</h2> : <h2>{props.title}{icon}</h2>
  return (
      <section style={{...cardStyle, display: 'flex', ...props.style}} className={"card-internal " + classes}>
        {props.imageOnRight ? <></> : image}
        <div style={{marginTop: 16}}>
          {[title, withText, date2, props.belowTitle]}
          <div dangerouslySetInnerHTML={{__html: props.html}} className="no-links"/>
        </div>
        {props.imageOnRight ? image : <></>}
      </section>
  )
}