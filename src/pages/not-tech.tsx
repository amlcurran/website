import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import Img from "gatsby-image";

interface NotTechQuery {

}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    return (
        <Layout seo={seo}>
            {data.allFile.edges.map(edge => <Img fluid={edge.node.childImageSharp.fluid} />)}
        </Layout>
    )
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