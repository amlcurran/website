import React, {CSSProperties} from "react"
import {Link} from "@reach/router"
import Styling from "./styling"
import "./layout.css"
import {GatsbyImage} from "gatsby-plugin-image"
import {Image} from "../pages/articles"

interface Linkable {
  url: string
}

export type Icon = "launch" | "play_circle_outline" | "email" | "file_download"

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
  return props.imageSize == 'large' ? "portfolio-image-large" : (props.imageSize == 'small' ? "portfolio-image-small" : "portfolio-image")
}

export const Item = (props: LargeCardProps) => {
  const date2 = (props.date?.length || 0) > 0 ? (<h4>{props.date}</h4>) : undefined
  const withText = (props.with?.length || 0) > 0 ? (<h4 style={{ color: Styling.primaryColor }}>with {props.with}</h4>) : undefined
  const image = props.image ? <div className={imageClasses(props)}>{props.image}</div> : undefined
  const icon = props.icon ? <span className="material-icons" style={{paddingLeft: 8}}>{props.icon}</span> : undefined
  let classes = props.hover ? "hover-background " : " "
  classes += props.className || ""
  return (
      <section style={props.style} className={"card-internal card-total " + classes}>
        {props.imageOnRight ? <></> : image}
        <div className="article-text">
          <h2>{props.title}{icon}</h2>
          {[withText, date2, props.belowTitle]}
          <div dangerouslySetInnerHTML={{__html: props.html}} className="no-links"/>
        </div>
        {props.imageOnRight ? image : <></>}
      </section>
  )
}

interface ArticleProps {
  title: string
  html: string
  link?: string
  image: Image | string
  rawDate: string
}

function imagePart(props: ArticleProps & Linkable): JSX.Element {
  if (typeof props.image == "string") {
      return <img
        src={props.image}
        alt={`Image for ${props.title}`}
        className="article-image card-image"
        style={{borderRadius: 8}} />
  } else {
      return <GatsbyImage
          image={props.image.childImageSharp.gatsbyImageData}
          alt={`Image for ${props.title}`}
          className="article-image card-image"
          imgClassName="article-image"
      imgStyle={{borderRadius: 8}}/>
  }
}

export const LinkedArticle = (props: ArticleProps & Linkable) => {
  return (
      <Link to={props.url}>
        <section className="card-total hover-background">
          {imagePart(props)}
          <div className="article-text">
            <h2>{props.title}</h2>
            <h4>{new Date(props.rawDate).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}</h4>
            <div dangerouslySetInnerHTML={{__html: props.html}} className="no-links article-snippet"
                 style={{lineClamp: 3}}/>
          </div>
        </section>
      </Link>
  )
}