import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Edge, GraphQLList} from "../utils/graphql"
import {MarkdownRemark} from "../utils/remark"
import {Item} from "../components/card"
import PhoneFrame from "../components/phone-frames"
import {Splitter} from "../components/Splitter"

interface PortfolioFrontmatter extends PortfolioSmall {
  team: number
  platforms: string[]
  date: string
  links: string[]
  with?: string
  secondImage?: string
}

interface PortfolioSmall {
  title: string
  images: string[]
  largeImage: boolean
  position: string
  description: string
  year: string
}

interface PortfolioQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<PortfolioFrontmatter>>
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
  const seo = <SEO title="Portfolio"
                   keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                   description="A series of my most popular projects"
                   key="SEO"
                   bodyAttributes={{class: "snap-scroll"}} />
  return (
    <Layout seo={seo}>
      <main className="collapsingGrid">
        {data.allMarkdownRemark.edges.map(asPortfolioExcerpt).concat(older())}
      </main>
    </Layout>
  )
}

function asPortfolioExcerpt({ node }: Edge<MarkdownRemark<PortfolioFrontmatter>>, index: number): JSX.Element {
  let secondImage: JSX.Element
  if (node.frontmatter.secondImage) {
    secondImage = <Splitter
        key={node.id}
        left={<PhoneFrame name={node.frontmatter.secondImage}/>}
        right={<PhoneFrame name={node.frontmatter.images[0]}/>}
        expandRight={index % 2 == 1}/>
  } else {
    secondImage = <PhoneFrame name={node.frontmatter.images[0]}/>
  }
  return (
      <Item
          key={node.frontmatter.title}
          title={node.frontmatter.title}
          subhead2={node.frontmatter.position + " ● " + node.frontmatter.date}
          body={node.html}
          image={secondImage}
          imageSize={'normal'}
          imageOnRight={index % 2 == 1}
          style={{marginBottom: 72, scrollSnapAlign: 'start'}}/>
  )
}

function older(): JSX.Element[] {
  const frontmatters: PortfolioSmall[] = [
    {
      title: "AutoScout24 & Novoda",
      images: [],
      largeImage: false,
      position: "Project Lead",
      description: "Helping the current team skill up and handle technical debt.",
      year: "2017"
    },
    {
      title: "ImmoScout24 & Novoda",
      images: [],
      largeImage: false,
      position: "Project Lead",
      description: "Scaling up the teams and helping their technical process.",
      year: "2016-2017"
    },
    {
      title: "Oddschecker & Novoda",
      images: [],
      largeImage: false,
      position: "Senior Software Engineer",
      description: "Building a brand new gambling app.",
      year: "2015"
    },
    {
      title: "All 4 & Novoda",
      images: [],
      largeImage: false,
      position: "Software Engineer",
      description: "Continuing my work in video playback to build a new All 4 app from scratch.",
      year: "2014"
    },
    {
      title: "iPlayer for Chromecast",
      images: [],
      largeImage: false,
      position: "Software Engineer",
      description: "Building Chromecast functionality into the iPlayer app in collaboration with Google.",
      year: "2014"
    },
    {
      title: "Downloads on iPlayer",
      images: [],
      largeImage: false,
      position: "Junior Software Engineer",
      description: "Building and improving the video download and DRM solutions into iPlayer.",
      year: "2013-2014"
    },
    {
      title: "BBC Android Video Player",
      images: [],
      largeImage: false,
      position: "Junior Software Engineer",
      description: "Building the next generation of video playback into the Android iPlayer app using ExoPlayer.",
      year: "2014"
    }
  ]
  return [
    (<div className="smaller-projects">
      {frontmatters.map((frontmatter) => small(frontmatter))}
    </div>)
  ]
}

function small(frontmatter: PortfolioSmall): JSX.Element {
  return (
    <div style={{scrollSnapAlign: "start end"}}>
      <h3>{frontmatter.title}</h3>
      <h4>{frontmatter.position} ● {frontmatter.year}</h4>
      <section style={{ marginTop: 8 }}>{frontmatter.description}</section>
    </div>
  )
}


export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: ASC , fields: [frontmatter___rank]},
        filter: {fileAbsolutePath: {glob: "**/portfolio-*.md"} }) {
      edges {
        node {
          html
          frontmatter {
            title
            team
            platforms
            date
            with
            position
            images
            largeImage
            secondImage
            rank
          }
        }
      }
    }
  }
`

export default Portfolio
