import {graphql} from "gatsby"
import React from "react"
import {MarkdownRemark} from "../utils/remark"
import Layout from "./layout"
import SEO from "./seo"
import ogs from "open-graph-scraper"
import {ArticleFrontmatter} from "../pages/articles"
import {PreviouslyOn} from "./PreviouslyOn";
import {booleanComponent, optionalComponent} from "../utils/optionalComponent";
import {UnlistedWarning} from "./UnlistedWarning";

const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
}

interface ArticleQuery {
    markdownRemark: MarkdownRemark<ArticleFrontmatter>
}

export default function ArticlePage({data, pageContext}: {data: ArticleQuery, pageContext: { previousOpenGraph?: ogs.OpenGraphProperties }}) {
    const snippet = data.markdownRemark.frontmatter.snippet || "Articles and piece I've written"
    const seo = <SEO
        title={data.markdownRemark.frontmatter.title}
        keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]}
        description={snippet}
        key="SEO"
        image={data.markdownRemark.frontmatter.featured?.childImageSharp.gatsbyImageData}
    />
    const previouslyOn = optionalComponent(
      pageContext.previousOpenGraph,
      (properties) => <PreviouslyOn previousOpenGraph={properties} previous={data.markdownRemark.frontmatter.previous!}/>
    )
    const unlisted = booleanComponent(
      data.markdownRemark.frontmatter.unlisted,
      () => <UnlistedWarning />
    )
    return (
        <Layout seo={seo} style={{paddingTop: 16}}>
            <article className={"readable-width"}>
                <h4>{data.markdownRemark.timeToRead + " minutes to read  ● "}<time>{new Date(data.markdownRemark.frontmatter.rawDate).toLocaleDateString(undefined, dateOptions)}</time></h4>
                <h1 style={{marginTop: 12}}>{data.markdownRemark.frontmatter.title}</h1>
                {previouslyOn}
                {unlisted}
                <p dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
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
        snippet
        image
        unlisted
        featured: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        rawDate
      }
    }
  }
`
