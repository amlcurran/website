import React, { CSSProperties } from "react"

import { contentStyle } from "../components/layout"
import SEO from "../components/seo"
import Card, { BlogCard, ContactCard } from '../components/card'

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
        <div style={{ display: "flex", flexWrap: "wrap", margin: -12 }}>
          <Card title="Portfolio"
            text="A collection of the projects I’ve worked on in my professional career"
            goesTo="/portfolio" />
          <Card title="Talks"
            text="My public speaking about tech, code, and more. For example, Writing Better Swift"
            goesTo="/talks" />
          <Card title="A bit on the side"
            text="My suite of side projects in various states of abandonment, investigating new technologies and solving issues"
            goesTo="/side-projects"
            doNotWrapTitle={true} />
          <BlogCard title="Blog"
            text="Sometimes, I write. Here are the things I write. The last thing I wrote was…"
            goesTo="https://www.medium.com/@amlcurran" />
          <Card title="Not Tech"
            text="Not all that I do revolves around tech. See the hobbies I have and the reasons why I do them."
            goesTo="/not-tech" />
          <ContactCard />

        </div>
      </main>
    </>
  )
}

export default NewIndexPage
