import React, {CSSProperties} from "react"

import SEO from "../components/seo"
import {Edge, SharpImage} from "../models/graphql"
import {GatsbyImage} from "gatsby-plugin-image"

const imageStyle: CSSProperties = {
    borderRadius: 8
}

export function images(name: string, notTechBits: Edge<SharpImage & File>[]): JSX.Element {
    return buildRow(notTechBits.filter((edge) => edge.node.name.indexOf(name) !== -1))
}

function buildRow(images: Edge<SharpImage & File>[]): JSX.Element {
    return <div style={{display: "grid", gridTemplateColumns: 'auto auto auto', gridColumnGap: 8, minHeight: 150}} className="imageRow">
        {images.map(image => <GatsbyImage
            key={image.node.name}
            image={image.node.childImageSharp.gatsbyImageData}
            alt=""
            style={imageStyle}
            imgStyle={imageStyle}
            className="imageItem"/>)}
    </div>
}

export const seo = <SEO
    title="Not tech"
    keywords={[`hands`, `developer`, `engineer`, `pottery`, `soap`]}
    description="Here's what I get up to when I'm not coding"
    key="SEO" />

export default images

