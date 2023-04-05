import {graphql, HeadProps} from "gatsby"
import React from "react"
import {MarkdownRemark} from "../utils/remark"
import Layout from "./layout"
import SEO from "./seo"
import ogs from "open-graph-scraper"
import {ArticleFrontmatter} from "../pages/articles"
import {PreviouslyOn} from "./PreviouslyOn";
import {booleanComponent, optionalComponent} from "../utils/optionalComponent";
import {UnlistedWarning} from "./UnlistedWarning";
import {SharpImage} from "../utils/graphql";
import {SEO2} from "./Seo2";

const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
}

interface ArticleQuery {
    markdownRemark: MarkdownRemark<ArticleFrontmatter>
}

interface ArticleContext {
    previousOpenGraph?: ogs.OpenGraphProperties
    image?: SharpImage
}

export default function ArticlePage({data, pageContext}: {data: ArticleQuery, pageContext: ArticleContext}) {
    if (!data.markdownRemark.frontmatter.snippet) {
        console.warn(`${data.markdownRemark.frontmatter.title} has no snippet`)
    }
    const previouslyOn = optionalComponent(
      pageContext.previousOpenGraph,
      (properties) => <PreviouslyOn previousOpenGraph={properties} previous={data.markdownRemark.frontmatter.previous!}/>
    )
    const unlisted = booleanComponent(
      data.markdownRemark.frontmatter.unlisted,
      () => <UnlistedWarning />
    )
    return (
        <Layout style={{paddingTop: 16}}>
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

export const Head = ({data, pageContext}: HeadProps<ArticleQuery, ArticleContext>) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.markdownRemark.frontmatter.title,
        abstract: data.markdownRemark.frontmatter.snippet || "Articles and piece I've written",
        image: [
          `https://www.amlcurran.co.uk${pageContext.image?.childImageSharp.gatsbyImageData.images.fallback?.src}`
        ],
        datePublished: new Date(data.markdownRemark.frontmatter.rawDate).toLocaleDateString(undefined, dateOptions),
        dateModified: new Date(data.markdownRemark.frontmatter.rawDate).toLocaleDateString(undefined, dateOptions),
        author: [{
            "@type": "Person",
            "name": "Alex Curran",
            "url": "https://www.amlcurran.co.uk"
        }],
    }
    return <>
        <script type="application/ld+json">{JSON.stringify(schema, null, 2)}</script>
        <SEO2
          title={data.markdownRemark.frontmatter.title}
          keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]}
          description={data.markdownRemark.frontmatter.snippet || "Articles and piece I've written"}
          key="SEO"
          image={`https://www.amlcurran.co.uk${pageContext.image?.childImageSharp.gatsbyImageData.images.fallback?.src}`}
        />
    </>;
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
