import React from "react"

import { graphql } from "gatsby";
import { ArticlePage, ArticleQuery } from "../../components/article";

const Article = ({ data }: { data: ArticleQuery }) => (<ArticlePage {...data} />)

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { glob: "**/articles/profiling-freetrade.md" }) {
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