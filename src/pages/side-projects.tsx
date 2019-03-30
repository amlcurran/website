import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { graphql } from "gatsby";

interface SideProjectFrontmatter {
  start: Date
  title: string
  technologies: string[]
}

interface SideProjectsQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<SideProjectFrontmatter>>
}

const SideProjects = ({ data }: { data: SideProjectsQuery }) => {
  const seo = <SEO title="Not tech" keywords={[`side projects`, `flutter`, `tech`]} description="Here's what I get up to when I'm not coding" key="SEO" />
  return (
    <Layout seo={seo}>
      {data.allMarkdownRemark.edges.map(asSideProject)}
    </Layout>
  )
}

function asSideProject({ node }: Edge<MarkdownRemark<SideProjectFrontmatter>>): JSX.Element {
  return (
    <div key={node.frontmatter.title}>
      <div style={{ display: 'flex', marginBottom: 24 }}>
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ marginBottom: 0 }}>{node.frontmatter.title}</h3>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: node.html }} />
    </div>
  )
}

export const pageQuery = graphql`{
  allMarkdownRemark(sort: { order: DESC , fields: [frontmatter___start]},
      filter: {fileAbsolutePath: {glob: "**/side-project-*.md"} }) {
    edges {
      node {
        html
        frontmatter {
          title
          start
          technologies
        }
      }
    }
  }
}
`

export default SideProjects