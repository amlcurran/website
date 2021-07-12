import { graphql } from "gatsby"
import React, {useEffect, useState} from "react"
import { MarkdownRemark } from "../models/remark"
import Layout from "./layout"
import SEO from "./seo"
import ogs, {OpenGraphProperties} from "open-graph-scraper"
import {Item} from "./card"

interface ArticleFrontmatter {
    title: string
    date: string
    previous?: string
}

interface ArticleQuery {
    markdownRemark: MarkdownRemark<ArticleFrontmatter>
}

function previouslyOnCard(previousOpenGraph: OpenGraphProperties | undefined, previous: string | undefined): JSX.Element {
    if (previousOpenGraph) {
        return <>
            <i>Previously posted on the <a href={previous}>Freetrade blog</a>.</i>
            <div style={{fontSize: 16, backgroundColor: "var(--background-alpha)", borderRadius: 8}}>
                <Item imageSize={"small"}
                      image={<img src={(previousOpenGraph.ogImage as any).url} style={{borderRadius: 8}}/>}
                      title={previousOpenGraph.ogTitle || ""}
                      html={previousOpenGraph.ogDescription || ""}
                      className="tiny-card"
                />
            </div>
        </>
    } else {
        return <></>
    }
}

export default function ArticlePage({data, pageContext}: {data: ArticleQuery, pageContext: { previousOpenGraph?: ogs.OpenGraphProperties }}) {
    const seo = <SEO title={data.markdownRemark.frontmatter.title} keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    const object = (previouslyOnCard(pageContext.previousOpenGraph, data.markdownRemark.frontmatter.previous))
    return (
        <Layout seo={seo} style={{paddingTop: 16}}>
            <article>
                <h4>{data.markdownRemark.timeToRead + " minutes to read  ● "}<time>{data.markdownRemark.frontmatter.date}</time></h4>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                {object}
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
        previous
      }
    }
  }
`