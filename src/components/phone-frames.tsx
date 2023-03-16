import React from "react"
import {StaticQuery, graphql, useStaticQuery} from "gatsby";
import {GatsbyImage} from "gatsby-plugin-image";

export const PhoneFrame = ({ name }: { name: any}) => {
  const data = useStaticQuery(graphql`
    query allFrames {
        allFile(filter: {extension: {eq: "png"}}) {
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
    `)
  const filtered = data.allFile.edges.filter((edge: any) => {
    return edge.node.name === name
  })
  return <GatsbyImage image={filtered[0].node.childImageSharp.gatsbyImageData} alt="Something"/>
}

export default PhoneFrame
