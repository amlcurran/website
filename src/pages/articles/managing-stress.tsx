import React from "react"

import { graphql } from "gatsby";
import { ArticlePage, ArticleQuery } from "../../components/article";

const Article = ({ data }: { data: ArticleQuery }) => (<ArticlePage {...data} />)

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { glob: "**/articles/managing-stress.md" }) {
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