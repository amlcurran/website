import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { GraphQLList } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";

interface ArticleFrontmatter {
    excerpt: string
}

class Remark<T> {
    childMarkdownRemark: MarkdownRemark<T>
}

interface ArticlesQuery {
    allFile: GraphQLList<Remark<ArticleFrontmatter>>
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    console.log(data.allFile.edges.map((remark) => remark.node.childMarkdownRemark.excerpt))
    return (
        <Layout seo={seo}>
            <p>All my new articles will be released here, but right now there aren't any. </p>
            <p>Check my <a href="https://www.medium.com/@amlcurran" target="_blank">Medium</a> account for older ones.</p>
        </Layout>
    )
}

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
        edges {
            node {
                childMarkdownRemark {
                    excerpt
                }
            }
        }
    }
  }  
`

export default Articles