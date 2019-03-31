import React, { CSSProperties } from "react"

import { contentStyle } from "../components/layout"
import SEO from "../components/seo"
import Card, { ExternalLinkCard } from '../components/card'
import "./index.css"

const myStyle: CSSProperties = {
  fontSize: 32,
  paddingTop: 12,
  paddingBottom: 12,
  fontWeight: 700,
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem'
}

const NewIndexPage = () => {
  return (
    <>
      <main style={contentStyle}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website" />
        <div style={{ ...myStyle }}>Hey, I'm Alex Curran.</div>
        <div style={{ marginBottom: 72 }}>I’m a software developer, specialising in mobile applications across Android and iOS.</div>
        <div className="left-shifted">
          <Card
            title="Portfolio"
            text="A collection of the projects I’ve worked on in my professional career"
            goesTo="/portfolio" />
          <Card
            title="Talks"
            text="My public speaking about tech, code, and more. For example, Writing Better Swift"
            goesTo="/talks" />
          <Card
            title="A bit on the side"
            text="My suite of side projects in various states of abandonment, investigating new technologies and solving issues"
            goesTo="/side-projects"
            doNotWrapTitle={true} /></div>
        <div className="right-shifted">
          <ExternalLinkCard
            title="⎋ Blog"
            text="Sometimes, I write. Here are the things I write. The last thing I wrote was…"
            goesTo="https://www.medium.com/@amlcurran" />
          <Card
            title="Not Tech"
            text="Not all that I do revolves around tech. See the hobbies I have and the reasons why I do them."
            goesTo="/not-tech" />
          <ExternalLinkCard
            title="Contact"
            text="Want to chat about something? Then get in touch"
            goesTo="mailto:aml.curran+website@gmail.com" />

        </div>
      </main>
    </>
  )
}

export default NewIndexPage
