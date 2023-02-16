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
import {PortfolioSmall, PortfolioViewModel} from "../portfolio/portfolioViewModel";
import {SmallCard} from "./smallCard";

export interface PortfolioFrontmatter extends PortfolioSmall {
  date: string
  secondImage?: string
}


export interface PortfolioQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<PortfolioFrontmatter>>
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
  // Use some state management to avoid rebuilding this all the time?
    const viewModel = new PortfolioViewModel(window.location, data)
  const seo = <SEO title="Portfolio"
                   keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                   description="A series of my most popular projects"
                   key="SEO" />
  return (
    <Layout seo={seo}>
      <main className="collapsingGrid">
        <Filters tags={viewModel.tags()}/>
        {data.allMarkdownRemark.edges.map((edge, index) => asPortfolioExcerpt(edge, index))}
        <div className="smaller-projects" key="smaller-projects">
          {
            viewModel.older()
              .map(viewState => <SmallCard {...viewState} />)
          }
        </div>
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
