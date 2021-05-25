import React, { CSSProperties } from "react"
import { Link } from "@reach/router";
import Styling from "./styling";
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

interface LargeCardProps {
  title: string
  html: string
  date?: string
  with?: string
  link?: string
  image?: JSX.Element
  largeImage: boolean
  materialIcon?: string
  imageOnRight?: boolean
  hover?: boolean
  style?: CSSProperties
}

export const Item = (props: LargeCardProps) => {
  const clazz = props.largeImage ? "portfolio-image-large" : "portfolio-image"
  const date2 = (props.date?.length || 0) > 0 ? (<h4>{props.date}</h4>) : undefined
  const withText = (props.with?.length || 0) > 0 ? (<h4 style={{ color: Styling.primaryColor }}>with {props.with}</h4>) : undefined
  const image = props.image ? <div className={clazz}>{props.image}</div> : undefined
  const icon = props.materialIcon ? <span className="material-icons" style={{paddingRight: 4}}>{props.materialIcon}</span> : undefined
  const classes = props.hover ? "hover-background" : ""
  return (
      <section style={{...cardStyle, display: 'flex', ...props.style}} className={"card-internal " + classes}>
        {props.imageOnRight ? <></> : image}
        <div style={{marginTop: 16}}>
          <h2>{icon}{props.title}</h2>
          {[withText, date2]}
          <div dangerouslySetInnerHTML={{__html: props.html}} className="no-links"/>
        </div>
        {props.imageOnRight ? image : <></>}
      </section>
  )
}