import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AppleLogo from "../images/apple_logo.svg"
import AndroidLogo from "../images/android.svg"

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
    edges: { node: T }[]
}

interface SharpImage {

}

interface PortfolioQuery {
    allMarkdownRemark: Edges<MarkdownRemark>
    placeholderImage: SharpImage
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
    const elements = data.allMarkdownRemark.edges.map(asPortfolioExcerpt)
    return (
        <Layout>
            {
                [<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="A series of my most popular projects" key="SEO"/>]
                    .concat(elements)
            }
        </Layout>
    )
}

function asPortfolioExcerpt({ node }: { node: MarkdownRemark }): JSX.Element {
    return (
        <div key={node.frontmatter.title}>
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    <h5>{node.frontmatter.date}</h5>
                    <h3>{node.frontmatter.title}</h3>
                </div>
                <div>
                    {node.frontmatter.team} ● {platforms(node)}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </div>
    )
}

function platforms(node: MarkdownRemark): JSX.Element {
    const apple = node.frontmatter.platforms.includes("iOS") ? <AppleLogo style={{ fill: "white" }} /> : null
    const android = node.frontmatter.platforms.includes("android") ? <AndroidLogo height="24px" style={{ fill: "white" }} /> : null
    return (<>
        {apple}
        {android}
    </>)
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
