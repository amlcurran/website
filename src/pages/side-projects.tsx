import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Edge, GraphQLList} from "../models/graphql"
import {MarkdownRemark} from "../models/remark"
import {graphql} from "gatsby"
import {Icon, Item} from "../components/card"
import {Chip} from "../components/Chip"
import PhoneFrame from "../components/phone-frames"

interface SideProjectFrontmatter {
    start: Date
    title: string
    technologies: string[]
    link?: string
    image?: string
}

interface SideProjectsQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<SideProjectFrontmatter>>
}

const SideProjects = ({data}: { data: SideProjectsQuery }) => {
    const seo = <SEO title="On the side" keywords={[`side projects`, `flutter`, `tech`, 'oo-er']}
                     description="Here's what I get up to when I'm not coding" key="SEO"/>
    return (
        <Layout seo={seo}>
            {data.allMarkdownRemark.edges.map(asSideProject)}
        </Layout>
    )
}

function asSideProject({node}: Edge<MarkdownRemark<SideProjectFrontmatter>>): JSX.Element {
    const foo = (
        <div style={{display: 'flex', overflow: 'scroll'}}>
            {node.frontmatter.technologies.map((chip) => <Chip text={chip}/>)}
        </div>
    )
    if (node.frontmatter.link) {
        const image = node.frontmatter.image ? <PhoneFrame name={node.frontmatter.image} /> : undefined
        return (<a href={node.frontmatter.link}>
            <Item title={node.frontmatter.title}
                  html={node.html}
                  key={node.id}
                  largeImage={false}
                  image={image}
                  hover={true}
                  icon={{name: "launch"}}/>
            {foo}
        </a>)
    } else {
        return (
            <>
                <Item title={node.frontmatter.title} html={node.html} key={node.id} largeImage={false}/>
                {foo}
            </>
        )
    }
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
          link
          image
        }
      }
    }
  }
}
`

export default SideProjects