const path = require("path")
const fetch = require("node-fetch")
const openGraphScraper = require("open-graph-scraper")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  {
  allMarkdownRemark(filter: { fileAbsolutePath: { regex: "\/articles/" } }, sort: { fields: [frontmatter___rawDate], order: DESC }) {
    edges {
        node {
            frontmatter {
                slug
                previous
                unlisted
            }
            fileAbsolutePath
            id
        }
    }
}}
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  for (const {node} of result.data.allMarkdownRemark.edges) {
    await createArticle(node, createPage)
  }
}

async function createArticle(node, createPage) {
  const blogPostTemplate = path.resolve(`src/components/article.tsx`)
  let fetchResult;
  if (node.frontmatter.previous) {
    fetchResult = await openGraphScraper({url: node.frontmatter.previous});
  } else {
    fetchResult = { }
  }
  
  if (node.frontmatter.unlisted === true) {
     console.log(`${node.frontmatter.slug} is unlisted`)
  }

  createPage({
    path: `articles/${node.frontmatter.slug}`,
    component: blogPostTemplate,
    context: {
      slug: node.frontmatter.slug,
      previousOpenGraph: fetchResult.result
    }
  })
}
