import {GatsbyImage} from "gatsby-plugin-image";
import React from "react";
import {Edge, SharpImage} from "../models/graphql";
import "./image-rail.scss"

interface ImageRailProps {
    images: Edge<SharpImage & File>[]
}

export function ImageRail({images}: ImageRailProps): JSX.Element {
    return <div className="imageRow">
        {images.map(image => <GatsbyImage
            key={image.node.name}
            image={image.node.childImageSharp.gatsbyImageData}
            alt=""
            imgClassName="imageItem"
            className="imageItem"/>)}
    </div>
}