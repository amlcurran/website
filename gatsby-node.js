const path = require("path")
const openGraphScraper = require("open-graph-scraper")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`{
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

  if (result.errors) {
    console.log(result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  for (const {node} of result.data.allMarkdownRemark.edges) {
    const image = result.data.allFile.edges
        .map(edge => edge.node)
        .filter(file => file.name === node.frontmatter.image)[0]
    await createArticle(node, createPage, image)
  }
}

async function createArticle(node, createPage, image) {
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
      previousOpenGraph: fetchResult.result,
      image: image
    }
  })
}
