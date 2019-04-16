import React, { CSSProperties } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { GraphQLList } from "../models/graphql";

const imageStyle: CSSProperties = {
}

interface NotTechQuery {
    allFile: GraphQLList<any>
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    const rounds = (data.allFile.edges.length / 3)
    const elements: JSX.Element[] = []
    for (let i = 0; i < rounds; i++) {
        const initialStep = i * 3
        const images = data.allFile.edges.slice(initialStep, initialStep + 3)
        elements.push(buildRow(images))
    }
    return (
        <Layout seo={seo}>
            {elements}
        </Layout>
    )
}

function buildRow(images: import("/Users/amlcurran/Projects/website/src/models/graphql").Edge<any>[]): JSX.Element {
    return <div style={{ display: "flex", position: "relative" }}>
        <Img fluid={images[0].node.childImageSharp.fluid} style={{ flexBasis: '60%', ...imageStyle }} />
        <div style={{ display: "flex", flexDirection: "column", flexBasis: '40%', ...imageStyle }}>
            <Img fluid={images[1].node.childImageSharp.fluid} style={{ flexBasis: '50%', ...imageStyle }} />
            {final(images)}
        </div>
    </div>;
}

function final(images: any): JSX.Element | null {
    if (images[2]) {
        return <Img fluid={images[2].node.childImageSharp.fluid} style={{flexBasis: '50%', ...imageStyle}} />                 
    }
    return null;
}

const seo = <SEO
    title="Not tech"
    keywords={[`hands`, `developer`, `engineer`, `pottery`, `soap`]}
    description="Here's what I get up to when I'm not coding"
    key="SEO" />

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "not-tech" } }) {
        edges {
            node {
                childImageSharp {
                    fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
  } 
`

export default NotTech