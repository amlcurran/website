import {Link} from "@reach/router";
import {GatsbyImage} from "gatsby-plugin-image";
import React, {CSSProperties} from "react";
import {Linkable} from "./linkedArticle";
import {SharpImage} from "../utils/graphql";

interface ArticleProps {
  title: string
  html: string
  image: SharpImage | string
  style?: CSSProperties
}

export const PocketArticle = (props: ArticleProps & Linkable) => {
  return (
    <a href={props.url} style={props.style}>
      <section className="card-total hover-background" style={{ flexDirection: 'column', minWidth: 'unset', gap: 'unset'}}>
        {imagePart(props)}
        <div className="article-text">
          <h4>{props.title}</h4>
          <div dangerouslySetInnerHTML={{__html: props.html}} className="no-links article-snippet" />
        </div>
      </section>
    </a>
  )
}

function imagePart(props: ArticleProps & Linkable): JSX.Element {
  if (typeof props.image == "string") {
    return <img
      src={props.image}
      alt={`Image for ${props.title}`}
      style={{borderRadius: 8, width: '100%', height: 108, aspectRatio: '16/9', objectFit: 'cover'}} />
  } else {
    return <GatsbyImage
      image={props.image.childImageSharp.gatsbyImageData}
      alt={`Image for ${props.title}`}
      style={{borderRadius: 8, width: '100%', height: 108, opacity: 0.4, aspectRatio: '16/9', objectFit: 'cover'}}/>
  }
}

