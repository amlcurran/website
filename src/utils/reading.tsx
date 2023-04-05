import React from "react";
import {graphql} from "gatsby";
import {GraphQLList} from "./graphql";
import Layout from "../components/layout";
import {LinkedArticle} from "../components/linkedArticle";
import {SEO2} from "../components/Seo2";

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
    return (
      <Layout>
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

export const Head = () => <SEO2 title={"My reading"} description={"Favourite articles from pocket"} />

export const pageQuery = graphql`{
  allPocketArticle(sort: {time_added: DESC}) {
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
}`

export default Reading
