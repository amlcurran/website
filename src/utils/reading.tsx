import React from "react";
import {graphql} from "gatsby";
import {Edge, GraphQLList} from "./graphql";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {LinkedArticle} from "../components/linkedArticle";

interface PocketApiArticle {
    title: string
    url: string
    image?: { src: string }
    excerpt: string
}

interface ReadingProps {
    allPocketArticle: GraphQLList<PocketApiArticle>
}

interface ReadingQuery {
    data: ReadingProps
}

const Reading = (query: ReadingQuery) => {
    let seo = <SEO title={"My reading"} description={"Favourite articles from pocket"} />
    return (
      <Layout seo={seo}>
          <div>
              {query.data.allPocketArticle.edges.map(article =>
                  <LinkedArticle title={article.node.title}
                                 html={article.node.excerpt}
                                 image={article.node.image?.src || ""}
                                 rawDate={""}
                                 url={article.node.url}/>
              )}
          </div>
      </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allPocketArticle(sort: {fields: time_added, order: DESC}) {
      edges {
        node {
            title
            url
            image {
              src
            }
            favorite
            excerpt
        }
      }
    }
  }
`

export default Reading