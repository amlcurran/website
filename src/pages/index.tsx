import React, { CSSProperties } from "react"

import SEO from "../components/seo"
import "./index.css"
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Styling from "../components/styling"
import FrontPageCard, { ExternalLinkFrontPageCard } from "../components/FrontPageCard";

const backgroundImageStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.15,
  zIndex: -1
}

const myStyle: CSSProperties = {
  paddingTop: 12,
  paddingBottom: 6
}

const NewIndexPage = (query: any) => (
  <>
    <main className="content">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website" />
      <div style={{ ...myStyle, color: Styling.secondaryColor }} className="headlineLink headline">Hey, I'm Alex Curran.</div>
      <div className="index-top">I’m a software developer, specialising in mobile applications across Android and iOS.</div>
      <div className="left-shifted">
        <FrontPageCard
            title="Portfolio"
            text="The projects I’ve worked on in my career"
            goesTo="/portfolio" />
        <FrontPageCard
            title="Talks"
            text="Public speaking about tech, code, and more."
            goesTo="/talks" />
        <FrontPageCard
            title="Projects"
            text="Side projects in various states of abandonment"
            goesTo="/side-projects"
            doNotWrapTitle={true} />
      </div>
      <div className="right-shifted">
        <FrontPageCard
            title="Articles"
            text="Sometimes, I write. Here are the things I write."
            goesTo="/articles" />
        <FrontPageCard
            title="Not Tech"
            text="Not all that I do revolves around tech."
            goesTo="/not-tech" />
        <ExternalLinkFrontPageCard
            title="Contact"
            text="Want to chat about something? Then get in touch"
            goesTo="mailto:aml.curran+website@gmail.com" />
      </div>
      <Img fluid={query.data.file.childImageSharp.fluid} style={backgroundImageStyle} />
    </main>
  </>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "writing-better-code.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default NewIndexPage
