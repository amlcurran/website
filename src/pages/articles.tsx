import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";

interface ArticleFrontmatter {
    title: string
}

class Remark<T> {
    childMarkdownRemark: MarkdownRemark<T>
}

interface ArticlesQuery {
    allFile: GraphQLList<Remark<ArticleFrontmatter>>
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    return (
        <Layout seo={seo}>
            <p>This page is still being built, and will show all my new articles.</p>
            <p>In the meantime, check my <a href="https://www.medium.com/@amlcurran" target="_blank">Medium</a> account for older ones.</p>
        </Layout>
    )
}

function asArticle(edge: Edge<Remark<ArticleFrontmatter>>): JSX.Element {
    return <div>{edge.node.childMarkdownRemark.frontmatter.title}</div>
}

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
        edges {
            node {
                childMarkdownRemark {
                    excerpt
                    frontmatter {
                        title
                    }
                }
            }
        }
    }
  }  
`

export default Articles