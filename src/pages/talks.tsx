import React, { CSSProperties } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import { Url } from "url";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { Item, LinkedItem } from "../components/card";

interface TalksFrontmatter {
  title: string
  slides: string
  video: Url
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
  display: "block",
  marginTop: 16,
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

function asTalkElement(query: TalksQuery): (edge: Edge<MarkdownRemark<TalksFrontmatter>>) => JSX.Element {
  return (edge) => {
    if (edge.node.frontmatter.video) {
      return (<a href={edge.node.frontmatter.video.toString()} target="_blank" rel="noopener noreferrer" className="hover-background"><Item
        key={edge.node.frontmatter.title}
        title={edge.node.frontmatter.title}
        date={""}
        link={String(edge.node.frontmatter.video)}
        hover={true}
        html={edge.node.html}
        with={edge.node.frontmatter.presentedAt}
        image={<Img fluid={imageForTalk(edge.node.frontmatter, query)} style={{ height: 250, borderRadius: 8 }} />}
        largeImage={true}
        materialIcon={"play_circle_outline"} /></a>)
    } else if (edge.node.frontmatter.slides) {
      return (
        <a href={edge.node.frontmatter.slides.toString()} target="_blank" rel="noopener noreferrer" className="hover-background">
          <Item
            key={edge.node.frontmatter.title}
            title={edge.node.frontmatter.title}
            date={""}
            link={String(edge.node.frontmatter.video)}
            hover={true}
            html={edge.node.html}
            with={edge.node.frontmatter.presentedAt}
            image={<Img fluid={imageForTalk(edge.node.frontmatter, query)} style={{ height: 250, borderRadius: 8 }} />}
            largeImage={true} />
        </a>
        )
    } else { 
        throw new Error(`Talk ${edge.node.frontmatter.title} needs slides or a video`)
    }
  }
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
