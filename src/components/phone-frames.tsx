import React from "react"
import { StaticQuery, graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

export const BackenIPhone = () => (
  <StaticQuery
    query={graphql`
      query iPhoneX { 
        file(relativePath: { eq: "backen-iphone.png" }) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      return (
        <Img fluid={data.file.childImageSharp.fluid} />
      )
    }}
  />
)