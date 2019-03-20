import React, { Component } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

interface Frontmatter {
    title: string
    team: number
    platforms: string[]
    date: string
    links: string[]
}

interface MarkdownRemark {
    html: string
    frontmatter: Frontmatter
}

interface Edge<T> {
    node: T
}

interface Edges<T> {
    edges: {node: T}[]
}

interface AllMarkdownRemark {
    allMarkdownRemark: Edges<MarkdownRemark>
}

const Portfolio = ({ data }: { data: AllMarkdownRemark }) => {
    const elements = data.allMarkdownRemark.edges.map(asPortfolioExcerpt)
    return (
        <Layout>
            {
                [<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="A series of my most popular projects" />]
                    .concat(elements)
            }
        </Layout>
    )
}

function asPortfolioExcerpt({ node }: {node: MarkdownRemark}): JSX.Element {
    return (
        <div>
            <h3>{node.frontmatter.title}</h3>
            <div>
                {node.frontmatter.team} ● {node.frontmatter.date}
            </div>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </div>
    )
}

export const pageQuery = graphql`{
    allMarkdownRemark {
      edges {
        node {
          excerpt
          html
          frontmatter {
            title
            team
            platforms
            date
          }
        }
      }
    }
  }
`

export default Portfolio
