import React, { CSSProperties } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { Url } from "url";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import Styling from "../components/styling";

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
  betterSwift: any
  lollipop: any
  betterCode: any
  codeWhispering: any
}

const talksStyle: CSSProperties = {
  display: "grid",
  gridRowGap: 16,
  gridColumnGap: 16
}

const Talks = ({ data }: { data: TalksQuery }) => {
  const seo = <SEO title="Talks" keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A summary of the talks I've done over my career" key="SEO" />
  const talks = data.allMarkdownRemark.edges.map(asTalkElement(data))
  return (
    <Layout seo={seo}>
      <div style={talksStyle} className="collapsingGrid">{talks}</div>
      <div />
    </Layout>
  )
}

const containerStyle: CSSProperties = {
  position: "relative", 
  marginBottom: 16
}

const textStyle: CSSProperties = {
  position: "absolute", 
  bottom: 0, 
  left: 0, 
  right:0, 
  paddingRight: 16, 
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  paddingLeft: 16, 
  paddingBottom: 16, 
  backgroundColor: "#0009"
}

function asTalkElement(query: TalksQuery): (edge: Edge<MarkdownRemark<TalksFrontmatter>>) => JSX.Element {
  return (edge) => (
    <div key={edge.node.frontmatter.title}>
      <div style={containerStyle}>
        <Img fluid={imageForTalk(edge.node.frontmatter, query)} style={{ height: 250, borderRadius: 8 }} />
        <div style={{...textStyle, display: "flex"}}>
          <div style={{flexGrow: 1}}>
            <h5 style={{color: Styling.talks.textColor}}>{edge.node.frontmatter.presentedAt}</h5>
            <h3 style={{marginBottom: 0, color: Styling.talks.textColor}}>{edge.node.frontmatter.title}</h3>
          </div>
          {buttons(edge.node.frontmatter)}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
    </div>
  )
}

function imageForTalk(frontmatter: TalksFrontmatter, query: TalksQuery): FluidObject {
  return query[frontmatter.image].childImageSharp.fluid
}

function buttons(frontmatter: TalksFrontmatter): JSX.Element[] {
  const elements: JSX.Element[] = []
  if (frontmatter.slides) {
    elements.push(
      <a href={frontmatter.slides} target="_blank" style={{paddingTop: 20, paddingLeft: 8, alignSelf: "center"}}>
        <i className="material-icons md-light md-36" >desktop_mac</i>
      </a>
    )
  }
  if (frontmatter.video) {
    elements.push(
      <a href={frontmatter.video} target="_blank" style={{paddingTop: 20, paddingLeft: 8, alignSelf: "center"}}>
        <i className="material-icons md-light md-36" >ondemand_video</i>
      </a>
    )
  }
  return elements
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
            video
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
