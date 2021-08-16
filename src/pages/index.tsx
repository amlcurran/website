import React, { CSSProperties } from "react"

import SEO from "../components/seo"
import "./index.css"
import Styling from "../components/styling"
import FrontPageCard, { ExternalLinkFrontPageCard } from "../components/FrontPageCard";
import { StaticImage } from "gatsby-plugin-image"

const myStyle: CSSProperties = {
  paddingTop: 12,
  paddingBottom: 6
}

const NewIndexPage = () => (
  <>
    <main className="content">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website" />
      <div className="index-top">
      <div style={{ ...myStyle, color: Styling.secondaryColor }} className="headlineLink headline">Hey, I'm Alex Curran.</div>
      I’m a software developer, specialising in mobile applications across Android and iOS.
      </div>
      <div className="front-page">
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
            goesTo="/side-projects" />
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
      <StaticImage src={"../images/writing-better-code.jpg"} alt={""} style={{ position: "absolute" }} className="background-image"  />
    </main>
  </>
)

export default NewIndexPage
