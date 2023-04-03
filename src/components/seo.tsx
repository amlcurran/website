import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  title: string
  description: string
  keywords?: string[],
  image?: any
}

function SEO({ description, keywords, title, image}: SEOProps) {
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
  const defKeywords = (keywords || []).join(", ")

  return (
    <Helmet
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
        {
          name: 'og:image:secure_url',
          content: image
        },
        {
          name: "keywords",
          content: defKeywords
        }
      ]}
    />
  )
}

export default SEO
