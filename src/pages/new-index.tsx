import React, { CSSProperties } from "react"
import { graphql } from "gatsby"

import Layout, { contentStyle } from "../components/layout"
import SEO from "../components/seo"
import { MarkdownRemark } from "../models/remark";

const myStyle: CSSProperties = {
  fontSize: 32,
  paddingTop: 12,
  paddingBottom: 12,
  fontWeight: 700,
  fontFamily: 'Raleway, sans-serif',
  letterSpacing: '0.15rem'
}

const NewIndexPage = ({ data }: IndexQuery) => {
  return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website" />
      <div style={{ ...contentStyle, ...myStyle }}>Hey, I'm Alex Curran.</div>
    </>
  )
}

interface IndexQuery {
  data: { markdownRemark: MarkdownRemark<any> }
}

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { glob: "**/home.md" }) {
        html 
    }
  }
`

export default NewIndexPage
