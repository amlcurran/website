import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { graphql } from "gatsby";
import { MarkdownRemark } from "../../models/remark";

interface ArticleFrontmatter {
    title: string
}

interface ArticleQuery {
    markdownRemark: MarkdownRemark<ArticleFrontmatter>
}

const Article = ({ data }: { data: ArticleQuery }) => {
    const seo = <SEO title={data.markdownRemark.frontmatter.title} keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    return (
        <Layout seo={seo}>
            <h4>{data.markdownRemark.timeToRead + " minutes to read"}</h4>
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
        </Layout>
    )
}

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { glob: "**/articles/managing-stress.md" }) {
        html
        id
        timeToRead
        frontmatter {
            title
            date
        }
    }
  }  
`

export default Article