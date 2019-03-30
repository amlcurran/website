import React, { CSSProperties } from "react"

import { contentStyle } from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby";

const myStyle: CSSProperties = {
  fontSize: 32,
  paddingTop: 12,
  paddingBottom: 12,
  fontWeight: 700,
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem'
}

interface CardProps {
  title: string
  text: string
  goesTo: string
}

const Card = (props: CardProps) => (
  <div>
    <Link to={props.goesTo}>
      <h1>{props.title}</h1>
      {props.text}
    </Link>
  </div>
)

const BlogCard = (props: CardProps) => (
  <div>
    <a href={props.goesTo}>
      <h1>{props.title}</h1>
      {props.text}
    </a>
  </div>
)

const ContactCard = () => (
  <div>
    <h1>Contact</h1>
    Want to chat about something? Then get in touch
  </div>
)

const NewIndexPage = () => {
  return (
    <>
      <main style={contentStyle}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website" />
        <div style={{ ...myStyle }}>Hey, I'm Alex Curran.</div>
        <div>I’m a software developer, specialising in mobile applications across Android and iOS.</div>
        <div>
          <Card title="Portfolio" text="A collection of the projects I’ve worked on in my professional career"
            goesTo="/portfolio" />
          <Card title="Talks" text="My public speaking about tech, code, and more. For example, Writing Better Swift"
            goesTo="/talks" />
          <Card title="A bit on the side" text="My suite of side projects in various states of abandonment, investigating new technologies and solving issues"
            goesTo="/portfolio" />
          <BlogCard title="Blog" text="Sometimes, I write. Here are the things I write. The last thing I wrote was…"
            goesTo="https://www.medium.com/@amlcurran" />
          <Card title="Not Tech" text="Not all that I do revolves around tech. See the hobbies I have and the reasons why I do them."
            goesTo="/not-tech" />
          <Card title="Portfolio" text="A collection of the projects I’ve worked on in my professional career"
            goesTo="/portfolio" />

        </div>
      </main>
    </>
  )
}

export default NewIndexPage
