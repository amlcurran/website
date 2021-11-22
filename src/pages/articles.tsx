import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { GraphQLList, Edge, SharpImage } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import {LinkedArticle} from "../components/card"

export interface ArticleFrontmatter {
  title: string
  slug: string
  image: string
  snippet?: string
  rawDate: string
  previous?: string
}

export type Image = { name: String } & SharpImage

interface ArticlesQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<ArticleFrontmatter>>
  allFile: GraphQLList<Image>
  stress: SharpImage
  profile: SharpImage
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
  const seo = <SEO title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
  const articles = data.allMarkdownRemark.edges.map(edge => <Article edge={edge} data={data} />)
  return (
    <Layout seo={seo}>
      <main className="collapsingGrid">
        {articles}
      </main>
    </Layout>
  )
}

const Article = ({edge, data}: { edge: Edge<MarkdownRemark<ArticleFrontmatter>>, data: ArticlesQuery }) =>
    <LinkedArticle
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        link={`/articles/${edge.node.frontmatter.slug}`}
        image={data.allFile.edges
            .map((edge) => edge.node)
            .filter((file: Image) => file.name === edge.node.frontmatter.image)[0]}
        html={edge.node.frontmatter.snippet || edge.node.excerpt || ""}
        url={`/articles/${edge.node.frontmatter.slug}`}
        rawDate={edge.node.frontmatter.rawDate}/>

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "\/articles/" } }, sort: { fields: [frontmatter___rawDate], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          frontmatter {
              title
              date
              slug
              image
              rawDate
              snippet
          }
        }
      }
    }
    allFile(filter: {absolutePath: {regex: "/articles/.*\\.(png|jpg)/"}}) {
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

export default Articles