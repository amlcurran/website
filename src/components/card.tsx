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

export const Item = (props: LargeCardProps) => {
  const subhead1 = (props.subhead1?.length || 0) > 0 ? (<h4 style={{ color: Styling.primaryColor }}>{props.subhead1}</h4>) : undefined
  const subhead2 = (props.subhead2?.length || 0) > 0 ? (<h4>{props.subhead2}</h4>) : undefined
  const image = props.image ? <aside className={imageClasses(props)}>{props.image}</aside> : undefined
  const classes = props.hover ? "hover-background " : " "
  const title = props.link ?
      <a href={props.link}><h2>{props.title}<span className="material-icons" style={{paddingLeft: 8}}>launch</span></h2>
      </a> : <h2>{props.title}</h2>
  return (
      <section style={props.style} className={"card-internal card-total " + classes}>
        {props.imageOnRight ? <></> : image}
        <div className="article-text">
          {title}
          {[subhead1, subhead2, props.belowTitle]}
          <p dangerouslySetInnerHTML={{__html: props.body}} className="no-links"/>
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
        className="article-image article-card-image"
        style={{borderRadius: 8}} />
  } else {
      return <GatsbyImage
          image={props.image.childImageSharp.gatsbyImageData}
          alt={`Image for ${props.title}`}
          className="article-image article-card-image"
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