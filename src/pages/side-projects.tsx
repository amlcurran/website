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
            <div className="collapsingGrid">
                {data.allMarkdownRemark.edges.map(asSideProject)}
            </div>
        </Layout>
    )
}

function asSideProject({node}: Edge<MarkdownRemark<SideProjectFrontmatter>>, index: number): JSX.Element {
    const foo = (
        <div style={{display: 'flex', flexWrap: "wrap", rowGap: 8, marginBottom: 4}}>
            {node.frontmatter.technologies.map((chip) => <Chip text={chip}/>)}
        </div>
    )
    const image = node.frontmatter.image ? <PhoneFrame name={node.frontmatter.image}/> : undefined
    const icon: Icon | undefined = node.frontmatter.link ? "launch" : undefined
    const item = (<Item
        key={node.id}
        title={node.frontmatter.title}
        body={node.html}
        imageSize={'normal'}
        imageOnRight={index % 2 == 1}
        image={image}
        belowTitle={foo}
        icon={icon}
        style={{marginBottom: 72}}/>)
    if (node.frontmatter.link) {
        return (<a href={node.frontmatter.link}>{item}</a>)
    } else {
        return item
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