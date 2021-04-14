import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { Item } from "../components/card";
import PhoneFrame from "../components/phone-frames";

interface PortfolioFrontmatter extends PortfolioSmall {
  team: number
  platforms: string[]
  date: string
  links: string[]
  with: string
}

interface PortfolioSmall {
  title: string
  images: string[]
  largeImage: boolean
  position: string
}

interface PortfolioQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<PortfolioFrontmatter>>
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
  const elements = data.allMarkdownRemark.edges.map(asPortfolioExcerpt).concat(older())
  const seo = <SEO title="Portfolio" keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A series of my most popular projects" key="SEO" />
  return (
    <Layout seo={seo}>
      {elements}
    </Layout>
  )
}

function asPortfolioExcerpt({ node }: Edge<MarkdownRemark<PortfolioFrontmatter>>): JSX.Element {
  return (
    <Item
      key={node.frontmatter.title}
      title={node.frontmatter.title}
      date={node.frontmatter.date + " ● " + node.frontmatter.position}
      html={node.html}
      with={node.frontmatter.with}
      image={<PhoneFrame name={node.frontmatter.images[0]} />}
      largeImage={node.frontmatter.largeImage} />
  )
}

function older(): JSX.Element[] {
  const frontmatters: PortfolioSmall[] = [
    {
      title: "Oddschecker",
      images: [],
      largeImage: false,
      position: "Senior Software Engineer"
    },
    {
      title: "All 4",
      images: [],
      largeImage: false,
      position: "Software Engineer"
    },
    {
      title: "iPlayer for Chromecast",
      images: [],
      largeImage: false,
      position: "Junior Software Engineer"
    },
    {
      title: "Downloads on iPlayer",
      images: [],
      largeImage: false,
      position: "Junior Software Engineer"
    },
    {
      title: "BBC Android Video Player",
      images: [],
      largeImage: false,
      position: "Junior Software Engineer"
    }
  ]
  return [
    (<div style={{ display: "grid", 
      gridTemplateColumns: "repeat(3, 1fr)",  
      gridRowGap: 32,
      gridColumnGap: 16 }}>
      {frontmatters.map((frontmatter) => small(frontmatter))}
    </div>)
  ]
}

function small(frontmatter: PortfolioSmall): JSX.Element {
  return (
    <div>
      <h3>{frontmatter.title}</h3>
      <h4>{frontmatter.position}</h4>
    </div>
  )
}


export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: DESC , fields: [frontmatter___start]},
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
          }
        }
      }
    }
  }
`

export default Portfolio
