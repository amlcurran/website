import React from "react"

import Layout from "../components/layout"
import { graphql } from "gatsby";
import { GraphQLList } from "../models/graphql";
import ui, { seo } from "../not-tech/page";

interface NotTechQuery {
    allFile: GraphQLList<any>
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    return (
        <Layout seo={seo}>
            {ui(data.allFile.edges)}
        </Layout>
    )
}

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