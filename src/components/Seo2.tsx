import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  title: string
  description: string
  keywords?: string[],
  image?: any
}

export function SEO2({ description, keywords, title, image}: SEOProps) {
  const metaDescription = description || "I’m Alex Curran, an engineering manager specialising in mobile applications across Android and iOS."
  const defKeywords = (keywords || []).join(", ")

  return <>
    <title>{title} | Alex Curran</title>
    <meta name="description" content={metaDescription} />
    <meta name="image" property="og:image" content={image} />
    <meta name="og:title" content={title} />
    <meta name="og:description" content={metaDescription} />
    <meta name="og:type" content="website" />
    <meta name="og:image" content={image} />
    <meta name="og:image:secure_url" content={image} />
    <meta name="twitter:creator" content="@amlcurran" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={metaDescription} />
    <meta name="twitter:card" content="summary" />
    <meta name="keywords" content={defKeywords} />
  </>
}
