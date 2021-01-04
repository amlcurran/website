import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { GraphQLList, Edge, SharpImage } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { LinkedItem } from "../components/card";
import Img from "gatsby-image";

interface ArticleFrontmatter {
    title: string
    slug: string
    date: string
    image: string
}

interface ArticlesQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<ArticleFrontmatter>>
    stress: SharpImage
    profile: SharpImage
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    const articles = data.allMarkdownRemark.edges.map((edge) => asArticle(edge, data))
    return (
        <Layout seo={seo}>
            {<main className="collapsingGrid">
                {articles}
            </main>}
            {<h3 style={{ textAlign: "center" }}><a href="https://www.medium.com/@amlcurran" target="_blank"> Older articles →</a></h3>}
        </Layout>
    )
}

function asArticle(edge: Edge<MarkdownRemark<ArticleFrontmatter>>, data: any): JSX.Element {
    return <LinkedItem
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        with={""}
        link={`/articles/${edge.node.frontmatter.slug}`}
        image={<Img fluid={data[edge.node.frontmatter.image].childImageSharp.fluid} style={{ borderRadius: 8 }} />}
        largeImage={true}
        html={edge.node.excerpt || ""}
        url={`/articles/${edge.node.frontmatter.slug}`} />
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "\/articles/" } }, sort: { fields: [frontmatter___rawDate], order: DESC }) {
        edges {
            node {
                    excerpt(pruneLength: 200)
                    id
                    frontmatter {
                        title
                        date
                        slug
                        image
                        rawDate
                    }
            }
        }
    }
    stress: file(relativePath: { eq: "IMG_2161.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    profile: file(relativePath: { eq: "6-output.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    catalyst: file(relativePath: { eq: "ec-both-apps.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    } 
`

export default Articles