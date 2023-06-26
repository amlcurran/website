import {Link} from "@reach/router";
import {GatsbyImage} from "gatsby-plugin-image";
import React from "react";
import {ArticleProps, Linkable} from "./linkedArticle";

export const PocketArticle = (props: ArticleProps & Linkable) => {
  return (
    <Link to={props.url} style={props.style}>
      <section className="card-total hover-background" style={{ flexDirection: 'column', minWidth: 'unset'}}>
        {imagePart(props)}
        <div className="article-text">
          <h3>{props.title}</h3>
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

function imagePart(props: ArticleProps & Linkable): JSX.Element {
  if (typeof props.image == "string") {
    return <img
      src={props.image}
      alt={`Image for ${props.title}`}
      className="article-card-image"
      style={{borderRadius: 8, width: '100%', aspectRatio: '16/9', objectFit: 'cover'}} />
  } else {
    return <GatsbyImage
      image={props.image.childImageSharp.gatsbyImageData}
      alt={`Image for ${props.title}`}
      className="article-card-image"
      imgClassName="article-card-image"
      imgStyle={{borderRadius: 8, width: '100%', aspectRatio: '16/9', objectFit: 'cover'}}/>
  }
}

