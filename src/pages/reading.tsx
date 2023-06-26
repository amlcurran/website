import React, {CSSProperties} from "react";
import {graphql} from "gatsby";
import {GraphQLList} from "../utils/graphql";
import Layout from "../components/layout";
import {LinkedArticle} from "../components/linkedArticle";
import {SEO2} from "../components/Seo2";
import {PocketArticle} from "../components/pocketArticle";

interface PocketApiArticle {
    title: string
    url: string
    image?: { src: string }
    excerpt: string
}

interface ReadingProps {
  engManagement?: GraphQLList<PocketApiArticle>
  generalFavs?: GraphQLList<PocketApiArticle>
}

interface ReadingQuery {
    data: ReadingProps
}

const Reading = (query: ReadingQuery) => {
    return (
      <Layout>
        <h2>Engineering management</h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16, overflow: 'scroll'  }}>
              {query.data.engManagement?.edges.map(article =>
                  <PocketArticle title={article.node.title}
                                 html={article.node.excerpt}
                                 image={article.node.image?.src || ""}
                                 rawDate={""}
                                 url={article.node.url}
                                 style={{width: 200}} />
              )}
          </div>
        <h2>General great articles</h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16,  overflow: 'scroll' }}>
              {query.data.generalFavs?.edges.map(article =>
                  <PocketArticle title={article.node.title}
                                 html={article.node.excerpt}
                                 image={article.node.image?.src || ""}
                                 rawDate={""}
                                 url={article.node.url}
                                 style={{width: 200}} />
              )}
          </div>
      </Layout>
  )
}

export const Head = () => <SEO2 title={"My reading"} description={"Favourite articles from pocket"} />

export const pageQuery = graphql`{
  engManagement: allPocketArticle(
    sort: {time_added: DESC}, 
    filter: {tags: {in: "engineering management"}}
  ) {
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
   generalFavs: allPocketArticle(
    sort: {time_added: DESC}
    filter: {favorite: {eq: true}}
  ) {
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
