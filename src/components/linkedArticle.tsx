import {Link} from "@reach/router";
import React, {CSSProperties} from "react";
import {GatsbyImage} from "gatsby-plugin-image";
import {Image} from "../pages/articles";

export interface Linkable {
    url: string
}

export interface ArticleProps {
    title: string
    html: string
    image: Image | string
    rawDate: string
    style?: CSSProperties
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

function imagePart(props: ArticleProps & Linkable): JSX.Element {
    if (typeof props.image == "string") {
        return <img
            src={props.image}
            alt={`Image for ${props.title}`}
            className="article-card-image"
            style={{borderRadius: 8}} />
    } else {
        return <GatsbyImage
            image={props.image.childImageSharp.gatsbyImageData}
            alt={`Image for ${props.title}`}
            className="article-card-image"
            imgClassName="article-card-image"
            imgStyle={{borderRadius: 8}}/>
    }
}

