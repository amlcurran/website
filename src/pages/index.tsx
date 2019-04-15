import React, { CSSProperties } from "react"

import { contentStyle } from "../components/layout"
import SEO from "../components/seo"
import Card, { ExternalLinkCard } from '../components/card'
import "./index.css"
import { graphql } from "gatsby";
import Img from "gatsby-image";

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
  fontSize: 32,
  paddingTop: 12,
  paddingBottom: 12,
  fontWeight: 700,
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem'
}

const NewIndexPage = (query: any) => (
  <>
    <main style={contentStyle}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website" />
      <div style={{ ...myStyle }}>Hey, I'm Alex Curran.</div>
      <div style={{ marginBottom: 72 }}>I’m a software developer, specialising in mobile applications across Android and iOS.</div>
      <div className="left-shifted">
        <Card title="Portfolio" text="A collection of the projects I’ve worked on in my professional career" goesTo="/portfolio" />
        <Card title="Talks" text="My public speaking about tech, code, and more." goesTo="/talks" />
        <Card title="A bit on the side" text="My suite of side projects in various states of abandonment" goesTo="/side-projects" doNotWrapTitle={true} /></div>
      <div className="right-shifted">
        <Card title="Articles" text="Sometimes, I write. Here are the things I write. The last thing I wrote was…" goesTo="/articles" />
        <Card title="Not Tech" text="Not all that I do revolves around tech, here's some of my hobbies" goesTo="/not-tech" />
        <ExternalLinkCard title="Contact" text="Want to chat about something? Then get in touch" goesTo="mailto:aml.curran+website@gmail.com" />
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
