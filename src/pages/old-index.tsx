import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { MarkdownRemark } from "../models/remark";

const IndexPage = ({data}: IndexQuery) => {
  return (
  <Layout seo={<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} description="Alex Curran's portfolio website"/>}>
    {[<div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />]}
  </Layout>
)}

interface IndexQuery {
  data: { markdownRemark: MarkdownRemark<any>}
}

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { glob: "**/home.md" }) {
        html 
    }
  }
`

export default IndexPage
