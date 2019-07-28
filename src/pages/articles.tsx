import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { LargeCard, BasicHtmlCard, SmallCard } from "../components/card";

interface ArticleFrontmatter {
    title: string
}

interface ArticlesQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<ArticleFrontmatter>>
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    const articles = data.allMarkdownRemark.edges.map(asArticle)
    return (
        <Layout seo={seo}>
            {articles}
            {/* <p>In the meantime, check my <a href="https://www.medium.com/@amlcurran" target="_blank">Medium</a> account for older ones.</p> */}
        </Layout>
    )
}

function asArticle(edge: Edge<MarkdownRemark<ArticleFrontmatter>>): JSX.Element {
    return <SmallCard 
        key={edge.node.id} 
        title={edge.node.frontmatter.title}
        html={edge.node.excerpt || ""} />
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "\/articles/" } }, sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
            node {
                    excerpt
                    id
                    frontmatter {
                        title
                        date
                    }
            }
        }
    }
  }  
`

export default Articles