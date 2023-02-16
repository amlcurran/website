import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Edge, GraphQLList} from "../utils/graphql"
import {MarkdownRemark} from "../utils/remark"
import {LargeCard} from "../components/card"
import PhoneFrame from "../components/phone-frames"
import {Splitter} from "../components/Splitter"
import {Filters} from "../components/Filters";
import {filterParam} from "../utils/filterParam";

export interface PortfolioFrontmatter extends PortfolioSmall {
  team: number
  platforms: string[]
  date: string
  links: string[]
  with?: string
  secondImage?: string
}

interface PortfolioSmall {
  title: string
  images: string[]
  largeImage: boolean
  position: string
  description: string
  year: string
  tags: string[]
}

interface PortfolioQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<PortfolioFrontmatter>>
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
  const seo = <SEO title="Portfolio"
                   keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                   description="A series of my most popular projects"
                   key="SEO"
                   bodyAttributes={{class: "snap-scroll"}} />
  return (
    <Layout seo={seo}>
      <main className="collapsingGrid">
        <Filters data={data.allMarkdownRemark.edges} />
        {data.allMarkdownRemark.edges.map(asPortfolioExcerpt).concat(older())}
      </main>
    </Layout>
  )
}

function image(node: MarkdownRemark<PortfolioFrontmatter>, index: number) {
  if (node.frontmatter.secondImage) {
    return <Splitter
        key={node.id}
        left={<PhoneFrame name={node.frontmatter.secondImage}/>}
        right={<PhoneFrame name={node.frontmatter.images[0]}/>}
        expandRight={index % 2 == 1}/>
  } else {
    return <PhoneFrame name={node.frontmatter.images[0]}/>
  }
}

function asPortfolioExcerpt({ node }: Edge<MarkdownRemark<PortfolioFrontmatter>>, index: number): JSX.Element {
  const secondImage = image(node, index)
  const hash = filterParam()
  const highlightForFilter = node.frontmatter.tags.indexOf(hash) != -1 || hash.length == 0
  return (
      <LargeCard
          key={node.frontmatter.title}
          title={node.frontmatter.title}
          subhead2={node.frontmatter.position + " ● " + node.frontmatter.date}
          body={node.html}
          image={secondImage}
          imageSize={'normal'}
          imageOnRight={index % 2 == 1}
          style={{
            marginBottom: 72,
            scrollSnapAlign: 'start',
            opacity: highlightForFilter ? 1 : 0.4
      }}/>
  )
}

function older(): JSX.Element[] {
  const frontmatters: PortfolioSmall[] = require('../portfolio/portfolio-small.json')
  return [
    (<div className="smaller-projects" key="smaller-projects">
      {frontmatters.map((frontmatter) => small(frontmatter))}
    </div>)
  ]
}

function small(frontmatter: PortfolioSmall): JSX.Element {
  const hash = filterParam()
  const highlightForFilter = frontmatter.tags.indexOf(hash) != -1 || hash.length == 0
  return (
    <div
        key={frontmatter.title}
        style={{scrollSnapAlign: "start end",
      opacity: highlightForFilter ? 1 : 0.4}}>
      <h3>{frontmatter.title}</h3>
      <h4>{frontmatter.position} ● {frontmatter.year}</h4>
      <section style={{ marginTop: 8 }}>{frontmatter.description}</section>
    </div>
  )
}


export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: ASC , fields: [frontmatter___rank]},
        filter: {fileAbsolutePath: {glob: "**/portfolio-*.md"} }) {
      edges {
        node {
          html
          frontmatter {
            title
            team
            platforms
            date
            with
            position
            images
            largeImage
            secondImage
            rank
            tags
          }
        }
      }
    }
  }
`

export default Portfolio
