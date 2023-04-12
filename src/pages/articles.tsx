import React from "react"

import Layout from "../components/layout"
import {graphql} from "gatsby";
import {Edge, GraphQLList, SharpImage} from "../utils/graphql";
import {MarkdownRemark} from "../utils/remark";
import {LinkedArticle} from "../components/linkedArticle";
import {SEO2} from "../components/Seo2";
import {getWindow} from "../utils/window";

export interface ArticleFrontmatter {
  title: string
  slug: string
  image: string
  snippet?: string
  rawDate: string
  previous?: string
  unlisted?: boolean
  featured?: SharpImage
}

export type Image = { name: String } & SharpImage

interface ArticlesQuery {
  allMarkdownRemark: GraphQLList<MarkdownRemark<ArticleFrontmatter>>
  allFile: GraphQLList<Image>
  stress: SharpImage
  profile: SharpImage
}

function notUnlistedOrInDebug(frontmatter: ArticleFrontmatter) {
  if (frontmatter.unlisted) {
    return !frontmatter.unlisted || getWindow()?.location.host === "localhost:8000"
  } else {
    return true
  }
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
  const articles = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(node => notUnlistedOrInDebug(node.frontmatter))
    .map(markdown =>
      <LinkedArticle
        title={markdown.frontmatter.unlisted ? `(Unlisted) ${markdown.frontmatter.title}` : markdown.frontmatter.title}
        image={firstImage(data, markdown)}
        html={markdown.frontmatter.snippet || markdown.excerpt || ""}
        url={`/articles/${markdown.frontmatter.slug}`}
        rawDate={markdown.frontmatter.rawDate}/>
    )
  return (
    <Layout>
      <main className="collapsingGrid">
        {articles}
      </main>
    </Layout>
  )
}

function firstImage(data: ArticlesQuery, markdown: MarkdownRemark<ArticleFrontmatter>) {
  return data.allFile.edges
    .map(edge => edge.node)
    .filter(file => file.name === markdown.frontmatter.image)[0];
}

const Article = ({markdown, image}: { markdown: MarkdownRemark<ArticleFrontmatter>, image: Image}) =>
    <LinkedArticle
        title={markdown.frontmatter.unlisted ? `(Unlisted) ${markdown.frontmatter.title}` : markdown.frontmatter.title}
        image={image}
        html={markdown.frontmatter.snippet || markdown.excerpt || ""}
        url={`/articles/${markdown.frontmatter.slug}`}
        rawDate={markdown.frontmatter.rawDate}/>

export const Head = () => <SEO2 title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />

export const query = graphql`{
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/articles/"}}
    sort: {frontmatter: {rawDate: DESC}}
  ) {
    edges {
      node {
        excerpt(pruneLength: 200)
        id
        frontmatter {
          title
          slug
          image
          rawDate
          snippet
          unlisted
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
            layout: CONSTRAINED
            aspectRatio: 1.33
            transformOptions: {cropFocus: CENTER}
          )
        }
      }
    }
  }
}`

export default Articles
