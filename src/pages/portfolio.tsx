import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {GraphQLList} from "../utils/graphql"
import {MarkdownRemark} from "../utils/remark"
import {LargeCard} from "../components/card"
import PhoneFrame from "../components/phone-frames"
import {Splitter} from "../components/Splitter"
import {Filters} from "../components/Filters";
import {
  PortfolioDoubleImage,
  PortfolioSingleImage,
  PortfolioSmall,
  PortfolioViewModel
} from "../portfolio/portfolioViewModel";
import {SmallCard} from "../components/smallCard";

export interface PortfolioFrontmatter extends PortfolioSmall {
  date: string
  secondImage?: string
}


export interface PortfolioQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<PortfolioFrontmatter>>
}

const Portfolio = ({ data }: { data: PortfolioQuery }) => {
  // Use some state management to avoid rebuilding this all the time?
  const location = typeof window !== `undefined` ? window.location : undefined
  const viewModel = new PortfolioViewModel(location, data)
  const seo = <SEO title="Portfolio"
                   keywords={[`portfolio`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                   description="A series of my most popular projects"
                   key="SEO" />
  return (
    <Layout seo={seo}>
      <main className="collapsingGrid">
        <Filters tags={viewModel.tags()}/>
        {
          viewModel.newer()
            .map(viewState =>
              <LargeCard
                key={viewState.title}
                title={viewState.title}
                subhead2={viewState.subtitle}
                body={viewState.text}
                image={image(viewState.image)}
                imageSize={'normal'}
                imageOnRight={viewState.imageOnRight}
                style={{
                  marginBottom: 72,
                  scrollSnapAlign: 'start',
                  opacity: viewState.lowerPriority ? 0.4 : 1
                }}/>
            )
        }
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

function image(node: PortfolioSingleImage | PortfolioDoubleImage) {
  if (typeof node === 'string') {
    return <PhoneFrame name={node}/>
  } else {
    return <Splitter
      key={node.key}
      left={<PhoneFrame name={node.second}/>}
      right={<PhoneFrame name={node.first}/>}
      expandRight={node.expandRight}/>
  }
}

export const pageQuery = graphql`{
  allMarkdownRemark(
    sort: {frontmatter: {rank: ASC}}
    filter: {fileAbsolutePath: {glob: "**/portfolio-*.md"}}
  ) {
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
}`

export default Portfolio
