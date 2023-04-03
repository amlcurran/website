import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Edge, GraphQLList} from "../utils/graphql"
import {MarkdownRemark} from "../utils/remark"
import {graphql} from "gatsby"
import {Icon, LargeCard} from "../components/card"
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
    const seo = <SEO title="On the side"
                     keywords={[`side projects`, `flutter`, `tech`, 'oo-er']}
                     description="Here's what I get up to when I'm not coding"
                     key="SEO"/>
    return (
        <Layout seo={seo}>
            <p style={{marginTop: 16}}>Here's a collection of side projects not related to my actual job, aiming to learn new projects or technologies.</p>
            <div className="collapsingGrid">
                {data.allMarkdownRemark.edges.map(asSideProject)}
            </div>
        </Layout>
    )
}

function asSideProject({node}: Edge<MarkdownRemark<SideProjectFrontmatter>>, index: number): JSX.Element {
    const techChips = (
        <div className="chips-host">
            {node.frontmatter.technologies.map((chip) => <Chip text={chip}/>)}
        </div>
    )
    const image = node.frontmatter.image ? <PhoneFrame name={node.frontmatter.image}/> : undefined
    return (<LargeCard
        key={node.id}
        title={node.frontmatter.title}
        text={node.html}
        imageSize={'normal'}
        imageOnRight={index % 2 == 1}
        image={image}
        subtitle={""}
        lowerPriority={false}
        link={node.frontmatter.link}
        belowTitle={techChips}
        style={{marginBottom: 72, scrollSnapAlign: "start"}}/>)
}

export const pageQuery = graphql`{
  allMarkdownRemark(
    sort: {frontmatter: {lastUpdated: DESC}}
    filter: {fileAbsolutePath: {glob: "**/side-project-*.md"}}
  ) {
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
}`

export default SideProjects
