const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/components/article.tsx`)

  const result = await graphql(`
  {
  allMarkdownRemark(filter: { fileAbsolutePath: { regex: "\/articles/" } }, sort: { fields: [frontmatter___rawDate], order: DESC }) {
    edges {
        node {
            frontmatter {
                slug
            }
        }
    }
}}
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(`Creating blog page ${node.frontmatter.slug}`)
    createPage({
      path: `articles/${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
          slug: node.frontmatter.slug
      }
    })
  })
}