import React, { CSSProperties } from "react"

import SEO from "../components/seo"
import Img from "gatsby-image";
import { Edge } from "../models/graphql";

const imageStyle: CSSProperties = {
}

export function ui(notTechBits: any[]): JSX.Element[] {
    const rounds = (notTechBits.length / 3)
    const elements: JSX.Element[] = []
    for (let i = 0; i < rounds; i++) {
        const initialStep = i * 3
        const images = notTechBits.slice(initialStep, initialStep + 3)
        elements.push(buildRow(images))
    }
    return elements
}

function buildRow(images: Edge<any>[]): JSX.Element {
    return <div style={{ display: "flex", position: "relative" }}>
        <Img fluid={images[0].node.childImageSharp.fluid} style={{ flexBasis: '60%', ...imageStyle }} />
        <div style={{ display: "flex", flexDirection: "column", flexBasis: '40%', ...imageStyle }}>
            <Img fluid={images[1].node.childImageSharp.fluid} style={{ flexBasis: '50%', ...imageStyle }} />
            {final(images)}
        </div>
    </div>;
}

function final(images: any): JSX.Element | null {
    if (images[2] && images[2].node.childImageSharp) {
        return <Img fluid={images[2].node.childImageSharp.fluid} style={{flexBasis: '50%', ...imageStyle}} />                 
    }
    return null;
}

export const seo = <SEO
    title="Not tech"
    keywords={[`hands`, `developer`, `engineer`, `pottery`, `soap`]}
    description="Here's what I get up to when I'm not coding"
    key="SEO" />

export default ui