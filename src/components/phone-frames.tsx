import React from "react"
import { StaticQuery, graphql } from "gatsby";
import {GatsbyImage} from "gatsby-plugin-image";

export const PhoneFrame = ({ name }: { name: any}) => (
  <StaticQuery
    query={graphql`
    query allFrames {
      allFile(filter: {relativeDirectory: {eq: "portfolio-images"}}) {
        edges {
          node {
          name
            childImageSharp {
              gatsbyImageData(
              layout: CONSTRAINED,
              transformOptions: {
                 cropFocus:CENTER
              }
            )
            }
          }
        }
      }
    }    
    `}
    render={data => {
      const filtered = data.allFile.edges.filter((edge: any) => {
        return edge.node.name === name
      })
      return (
        <GatsbyImage image={filtered[0].node.childImageSharp.gatsbyImageData} alt="Something" />
      )
    }}
  />
)

export default PhoneFrame
