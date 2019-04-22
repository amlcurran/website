import React from "react"
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

export const PhoneFrame = ({ name }: { name: any}) => (
  <StaticQuery
    query={graphql`
    query allFrames {
      allFile(filter: {relativeDirectory: {eq: "portfolio-images"}}) {
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
    `}
    render={data => {
      const filtered = data.allFile.edges.filter((edge: any) => {
        return edge.node.childImageSharp.fluid.src.indexOf(name) != -1
      })
      return (
        <Img fluid={filtered[0].node.childImageSharp.fluid} />
      )
    }}
  />
)

export default PhoneFrame