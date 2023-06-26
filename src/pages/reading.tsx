import React from "react";
import {graphql} from "gatsby";
import {GraphQLList, SharpImage} from "../utils/graphql";
import Layout from "../components/layout";
import {SEO2} from "../components/Seo2";
import {PocketArticle} from "../components/pocketArticle";

interface PocketApiArticle {
    title: string
    articleDomain: string
    url: string
    image?: { src: string }
    excerpt: string
}

interface ReadingProps {
  engManagement?: GraphQLList<PocketApiArticle>
  generalFavs?: GraphQLList<PocketApiArticle>
  placeholders: GraphQLList<SharpImage>
}

interface ReadingQuery {
    data: ReadingProps
}

const ReadingShelf = ({list, images}: {list?: GraphQLList<PocketApiArticle>, images: GraphQLList<SharpImage>}) => <div style={{ display: 'flex', flexDirection: 'row', gap: 16, overflow: 'scroll'  }}>
  {list?.edges.map((article, index) =>
    <PocketArticle title={article.node.title}
                   image={article.node.image?.src || images.edges[index % 3].node}
                   html={article.node.articleDomain}
                   key={article.node.title}
                   url={article.node.url}
                   style={{width: 250}} />
  )}
</div>

const Reading = (query: ReadingQuery) => {
    return (
      <Layout>
        <h2>Engineering management</h2>
        <ReadingShelf list={query.data.engManagement} images={query.data.placeholders} />
        <h2>General great articles</h2>
        <ReadingShelf list={query.data.generalFavs} images={query.data.placeholders} />
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
        articleDomain
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
        articleDomain
      }
    }
  }
  placeholders: allFile(filter: { name: {regex: "/techlife.*/"} }) {
    edges {
      node {
        childImageSharp {
          id
          gatsbyImageData(
              layout: FIXED
          )
        }
      }
    }
  }
}`

export default Reading
