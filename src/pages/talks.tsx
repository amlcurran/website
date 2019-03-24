import React, { CSSProperties } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { Url } from "url";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";

interface TalksFrontmatter {
    title: string
    slides: string
    video?: Url
    image: string
    presentedAt: string
    date: Date
}

interface TalksQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<TalksFrontmatter>>
    betterSwift
    lollipop
    betterCode
    codeWhispering
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
    const talks = data.allMarkdownRemark.edges.map(asTalkElement(data))
    return (
        <Layout seo={seo}>
           <div style={talksStyle}>{talks}</div>
           <div />
        </Layout>
    )
}

function asTalkElement(query: TalksQuery): (edge: Edge<MarkdownRemark<TalksFrontmatter>>) => JSX.Element {
    return (edge) => (
      <div style={talkStyle}>
        <Img fluid={imageForTalk(edge.node.frontmatter, query)} style={{height: 250}} />
        <h5>{edge.node.frontmatter.presentedAt}</h5>
        <h3>{edge.node.frontmatter.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
        <a href={edge.node.frontmatter.slides}>Slides</a>
      </div>  
    )
}

function imageForTalk(frontmatter: TalksFrontmatter, query: TalksQuery): FluidObject {
  return query[frontmatter.image].childImageSharp.fluid
}

export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: DESC , fields: [frontmatter___date]},
        filter: {fileAbsolutePath: {glob: "**/talks-*.md"} }) {
      edges {
        node {
          html
          frontmatter {
            title
            slides
            presentedAt
            image
          }
        }
      }
    }
    betterSwift: file(relativePath: { eq: "better-swift.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    lollipop: file(relativePath: { eq: "lollipop-iplayer-2.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    betterCode: file(relativePath: { eq: "writing-better-code.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    codeWhispering: file(relativePath: { eq: "code-whispering-2.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    springCleaning: file(relativePath: { eq: "rwdevcon.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    aid: file(relativePath: { eq: "aid.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    correctQuicker: file(relativePath: { eq: "being-correct-quicker.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Talks
