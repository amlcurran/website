import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { GraphQLList, Edge, SharpImage } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";
import { SmallCard } from "../components/card";
import Img from "gatsby-image";

interface ArticleFrontmatter {
    title: string
    slug: string
    date: string
}

interface ArticlesQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<ArticleFrontmatter>>
    image: SharpImage
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Articles" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO" />
    const articles = data.allMarkdownRemark.edges.map((edge) => asArticle(edge, data.image))
    return (
        <Layout seo={seo}>
            {<main style={{display: "grid", gridRowGap: 16, gridColumnGap: 16}} className="collapsingGrid">
                {articles}
            </main>}
            {<h3 style={{ textAlign: "center" }}><a href="https://www.medium.com/@amlcurran" target="_blank"> Older articles →</a></h3>}
        </Layout>
    )
}

function asArticle(edge: Edge<MarkdownRemark<ArticleFrontmatter>>, image: SharpImage): JSX.Element {
    return <SmallCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        with={""}
        link={`/articles/${edge.node.frontmatter.slug}`}
        image={<Img fluid={image.childImageSharp.fluid} style={{ borderRadius: 8 }} />}
        largeImage={true}
        html={edge.node.excerpt || ""}
        url={`/articles/${edge.node.frontmatter.slug}`} />
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "\/articles/" } }, sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
            node {
                    excerpt(pruneLength: 200)
                    id
                    frontmatter {
                        title
                        date
                        slug
                    }
            }
        }
    }
    image: file(relativePath: { eq: "IMG_2161.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
  }  
`

export default Articles