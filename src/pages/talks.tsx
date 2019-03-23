import React, { CSSProperties } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { Url } from "url";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";

interface TalksFrontmatter {
    title: string
    slides: string
    video?: Url
    image: Url
    presentedAt: string
}

interface TalksQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<TalksFrontmatter>>
}

const talksStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    margin: -8
}

const talkStyle: CSSProperties = {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 350,
    margin: 8
}

const Talks = ({ data }: { data: TalksQuery }) => {
    const seo = <SEO title="Talks" keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A summary of the talks I've done over my career" key="SEO"/>
    const talks = data.allMarkdownRemark.edges.map(asTalkElement)
    return (
        <Layout seo={seo}>
           <div style={talksStyle}>{talks}</div>
           <div />
        </Layout>
    )
}

function asTalkElement(edge: Edge<MarkdownRemark<TalksFrontmatter>>): JSX.Element {
    return (
      <div style={talkStyle}>
        <h5>{edge.node.frontmatter.presentedAt}</h5>
        <h3>{edge.node.frontmatter.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
        <a href={edge.node.frontmatter.slides}>Slides</a>
      </div>  
    )
}

export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: DESC , fields: [frontmatter___start]},
        filter: {fileAbsolutePath: {glob: "**/talks-*.md"} }) {
      edges {
        node {
          html
          frontmatter {
            title
            slides
            presentedAt
          }
        }
      }
    }
  }
`

export default Talks