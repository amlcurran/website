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
          name
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
        console.log(name)
        console.log(data.allFile.edges.map((edge: any) => edge.node.name))
      const filtered = data.allFile.edges.filter((edge: any) => {
        return edge.node.name === name
      })
      return (
        <Img fluid={filtered[0].node.childImageSharp.fluid} />
      )
    }}
  />
)

export default PhoneFrame