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

const cardStyle: CSSProperties = {
  minWidth: 250,
  flexGrow: 1,
  flexBasis: 0,
  margin: 12,
  minHeight: 200,
  background: 'white',
  padding: 12
}

const cardTitle: CSSProperties = {
  color: "#FF5900",
  fontSize: 56,
}

const cardText: CSSProperties = {
  color: "#242935"
}

const linkStyle: CSSProperties = {
  textDecoration: 'none'
}

interface CardProps {
  title: string
  text: string
  goesTo: string
  doNotWrapTitle?: boolean
}

const Card = (props: CardProps) => {
  const additionalTitleStyle: CSSProperties = props.doNotWrapTitle ? { whiteSpace: "nowrap" } : {}
  return (
    <div style={cardStyle}>
      <Link to={props.goesTo} style={linkStyle}>
        <h1 style={{ ...cardTitle, ...additionalTitleStyle }}>{props.title}</h1>
        <div style={cardText}>{props.text}</div>
      </Link>
    </div>
  )
}

const BlogCard = (props: CardProps) => (
  <div style={cardStyle}>
    <a href={props.goesTo} style={linkStyle}>
      <h1 style={cardTitle}>{props.title}</h1>
      <div style={cardText}>{props.text}</div>
    </a>
  </div>
)

const ContactCard = () => (
  <div style={cardStyle}>
    <h1 style={cardTitle}>Contact</h1>
    <div style={cardText}>Want to chat about something? Then get in touch</div>
  </div>
)

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
