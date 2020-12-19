import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { LargeCard } from "../components/card";
import PhoneFrame from "../components/phone-frames";

interface PortfolioFrontmatter {
  title: string
  team: number
  platforms: string[]
  date: string
  links: string[]
  with: string
  position: string
  images: string[]
  largeImage: boolean
}

interface PortfolioQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<PortfolioFrontmatter>>
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
  const elements = data.allMarkdownRemark.edges.map(asPortfolioExcerpt)
  const seo = <SEO title="Portfolio" keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A series of my most popular projects" key="SEO" />
  return (
    <Layout seo={seo}>
      {elements}
    </Layout>
  )
}

function asPortfolioExcerpt({ node }: Edge<MarkdownRemark<PortfolioFrontmatter>>): JSX.Element {
  return (
    <LargeCard
      key={node.frontmatter.title}
      title={node.frontmatter.title}
      date={node.frontmatter.date + " ● " + node.frontmatter.position}
      html={node.html}
      with={node.frontmatter.with}
      image={<PhoneFrame name={node.frontmatter.images[0]} />}
      largeImage={node.frontmatter.largeImage} />
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
