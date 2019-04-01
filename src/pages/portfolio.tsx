import React from "react"
import { graphql } from "gatsby"

import Badge from "../components/badge"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AppleLogo from "../images/apple_logo.svg"
import AndroidLogo from "../images/android.svg"
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { LargeCard } from "../components/card";

interface PortfolioFrontmatter {
    title: string
    team: number
    platforms: string[]
    date: string
    links: string[]
    with: string
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
    const badges = [
        <Badge text="Devs" component={(<div style={{ fontWeight: 700, fontSize: 20 }}>{node.frontmatter.team}</div>)} />,
        platforms(node.frontmatter.platforms)
    ]
    return (
        <LargeCard
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            badges={badges}
            html={node.html}
            with={node.frontmatter.with} />
    )
}

function platforms(platforms: string[]): JSX.Element {
    const apple = platforms.includes("iOS") ? <Badge text="iOS" component={<AppleLogo style={{ fill: "white" }} />} /> : null
    const android = platforms.includes("android") ? <Badge text="Android" component={<AndroidLogo height="24px" style={{ fill: "white" }} />} /> : null
    return (<>
        {apple}
        {android}
    </>)
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
          }
        }
      }
    }
  }
`

export default Portfolio
