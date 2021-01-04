import { graphql } from "gatsby"
import React from "react"
import { MarkdownRemark } from "../models/remark"
import Layout from "./layout"
import SEO from "./seo"

interface ArticleFrontmatter {
    title: string
    date: string
}

interface ArticleQuery {
    markdownRemark: MarkdownRemark<ArticleFrontmatter>
}

export default function ArticlePage({data}: {data: ArticleQuery}) {
    const seo = <SEO title={data.markdownRemark.frontmatter.title} keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    return (
        <Layout seo={seo} style={{paddingTop: 16}}>
            <article>
                <h4>{data.markdownRemark.timeToRead + " minutes to read  ● "}<time>{data.markdownRemark.frontmatter.date}</time></h4>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
            </article>
        </Layout>
    )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        date
        title
      }
    }
  }
`