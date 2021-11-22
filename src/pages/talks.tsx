import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {graphql} from "gatsby"
import {Url} from "url"
import {Edge, GraphQLList} from "../models/graphql"
import {MarkdownRemark} from "../models/remark"
import {Item} from "../components/card"
import {Image} from "./articles"
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image"

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
  allFile: GraphQLList<Image>
}

const Talks = ({ data }: { data: TalksQuery }) => {
  return (
    <Layout seo={<SEO title="Talks"
                      keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                      description="A summary of the talks I've done over my career" key="SEO"/>}>
      <div className="collapsingGrid">
        {data.allMarkdownRemark.edges.map(edge => <TalkElement edge={edge} query={data} key={edge.node.id}/>)}
      </div>
    </Layout>
  )
}

interface TalkElementProps {
  query: TalksQuery
  edge: Edge<MarkdownRemark<TalksFrontmatter>>
}

const TalkElement = ({query, edge}: TalkElementProps) => {
  const foo = <TalkItem edge={edge} query={query} showIcon={edge.node.frontmatter.video !== undefined} />
  if (edge.node.frontmatter.video) {
    return (
        <a href={edge.node.frontmatter.video.toString()}
           target="_blank"
           rel="noopener noreferrer"
           className="hover-background">
          {foo}
        </a>
    )
  } else if (edge.node.frontmatter.slides) {
    return (
        <a href={edge.node.frontmatter.slides.toString()}
           target="_blank"
           rel="noopener noreferrer"
           className="hover-background">
          {foo}
        </a>
    )
  } else {
    throw new Error(`Talk ${edge.node.frontmatter.title} needs slides or a video`)
  }
}

const TalkItem = ({edge, query, showIcon}: {
  edge: Edge<MarkdownRemark<TalksFrontmatter>>,
  query: TalksQuery,
  showIcon: boolean
}) =>
    <Item
        key={edge.node.frontmatter.title}
        title={edge.node.frontmatter.title}
        date={""}
        link={String(edge.node.frontmatter.video)}
        hover={true}
        html={edge.node.html}
        with={edge.node.frontmatter.presentedAt}
        image={
          <GatsbyImage
              image={imageForTalk(edge.node.frontmatter, query)}
              imgStyle={{height: 250, borderRadius: 8}} alt=""/>
        }
        imageSize={'large'}
        icon={showIcon ? 'launch' : undefined}/>

function imageForTalk(frontmatter: TalksFrontmatter, query: TalksQuery): IGatsbyImageData {
  let node = query.allFile.edges.find(edge => edge.node.name === frontmatter.image)?.node
  return node?.childImageSharp.gatsbyImageData!
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
    allFile(filter: {absolutePath: {regex: "/talks/.*\\.(png|jpg|jpeg)/"}}) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED,
              aspectRatio: 1.33,
              transformOptions: {
                 cropFocus:CENTER
              }
            )
          }
        }
      }
    }
  }
`

export default Talks
