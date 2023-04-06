import openGraphScraper from "open-graph-scraper";
import type {CreatePagesArgs, GatsbyNode, Page} from "gatsby"
import path from "path";
import {GraphQLList} from "./src/utils/graphql";
import {MarkdownRemark} from "./src/utils/remark";
import {ArticleFrontmatter, Image} from "./src/pages/articles";

interface PagesQuery {
  data?: {
    allMarkdownRemark: GraphQLList<MarkdownRemark<ArticleFrontmatter>>
    allFile: GraphQLList<Image>
  }
  errors?: any[]
}

export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql, reporter }: CreatePagesArgs) => {
  const { createPage } = actions

  const result: PagesQuery = await graphql(`{
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "/articles/"}}
    sort: {frontmatter: {rawDate: DESC}}
  ) {
    edges {
      node {
        frontmatter {
          slug
          previous
          unlisted
          image
        }
        fileAbsolutePath
        id
      }
    }
  }
  allFile(filter: {absolutePath: {regex: "/articles/.*\\\\.(png|jpg)/"}}) {
    edges {
      node {
        name
        childImageSharp {
          gatsbyImageData(
            width: 1024
          )
        }
      }
    }
  }
}`)

  if (result.errors || !result.data) {
    reporter.error(result.errors || "No errors")
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  for (const {node} of result.data.allMarkdownRemark.edges) {
    const image = result.data.allFile.edges
        .map(edge => edge.node)
        .filter(file => file.name === node.frontmatter.image)[0]
    const page = await pageForArticle(node, image)
    await createPage(page)
  }
}

async function fetchOpenGraphForPrevious(node: any): Promise<any> {
  if (node.frontmatter.previous) {
    return openGraphScraper({url: node.frontmatter.previous});
  } else {
    return {}
  }
}

async function pageForArticle(node: MarkdownRemark<ArticleFrontmatter>, image: Image): Promise<Page> {
  const blogPostTemplate = path.resolve(`src/components/article.tsx`)
  const fetchResult = await fetchOpenGraphForPrevious(node);

  if (node.frontmatter.unlisted === true) {
     console.log(`${node.frontmatter.slug} is unlisted`)
  }

  return {
    path: `articles/${node.frontmatter.slug}`,
    component: blogPostTemplate,
    context: {
      slug: node.frontmatter.slug,
      previousOpenGraph: fetchResult.result,
      image: image
    }
  }
}
