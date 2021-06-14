/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Styling from "./styling"

interface SEOProps {
  description: string
  lang?: string
  meta?: any[]
  keywords?: string[],
  title: string
}

function SEO({ description, lang, meta, keywords, title }: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defKeywords = keywords || []
  const defMeta = meta || []

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `theme-color`,
          content: 'rgb(255, 255, 255)',
          media: '(prefers-color-scheme: light)'
        },
        {
          name: `theme-color`,
          content: '#191a1f',
          media: '(prefers-color-scheme: dark)'
        },
      ]
        .concat(
          defKeywords.length > 0
            ? {
                name: `keywords`,
                content: defKeywords.join(`, `),
              }
            : []
        )
        .concat(defMeta)}
    />
  )
}

export default SEO
