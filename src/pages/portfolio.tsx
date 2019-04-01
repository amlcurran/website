import React from "react"
import { graphql } from "gatsby"

import Badge from "../components/badge"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img, { FluidObject } from "gatsby-image";
import AppleLogo from "../images/apple_logo.svg"
import AndroidLogo from "../images/android.svg"
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { LargeCard } from "../components/card";
import Styling from "../components/styling";

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
    frameBlue: any
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
    const elements = data.allMarkdownRemark.edges.map(asPortfolioExcerpt(data.frameBlue.childImageSharp.fluid))
    const seo = <SEO title="Portfolio" keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A series of my most popular projects" key="SEO" />
    return (
        <Layout seo={seo}>
            {elements}
        </Layout>
    )
}

function asPortfolioExcerpt(image: FluidObject): ({ node }: Edge<MarkdownRemark<PortfolioFrontmatter>>) => JSX.Element {
    return ({ node }) => {
        const badges = [
            <Badge text="Devs" component={(<div style={{ fontWeight: 700, fontSize: 20, color: Styling.white }}>{node.frontmatter.team}</div>)} />,
            platforms(node.frontmatter.platforms)
        ]
        return (
            <LargeCard
                title={node.frontmatter.title}
                date={node.frontmatter.date}
                badges={badges}
                html={node.html}
                with={node.frontmatter.with}
                image={<Img fluid={image} />} />
        )
    }
}

function platforms(platforms: string[]): JSX.Element {
    const apple = platforms.includes("iOS") ? <Badge text="iOS" component={<AppleLogo height="26px" style={{ fill: "white" }} />} /> : null
    const android = platforms.includes("android") ? <Badge text="Android" component={<AndroidLogo height="26px" style={{ fill: "white" }} />} /> : null
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
    frameBlue: file(relativePath: { eq: "test-blue.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
  }
`

export default Portfolio
