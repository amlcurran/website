import React from "react"

import Layout from "../components/layout"
import { graphql } from "gatsby";
import { GraphQLList, SharpImage } from "../models/graphql";
import { seo, images } from "../not-tech/page";

interface NotTechQuery {
    allFile: GraphQLList<SharpImage & File>
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    return (
        <Layout seo={seo}>
            <p style={{marginTop: 16}}>I try hard to make sure that I don't spend all my time on my computer. Whilst not easy in my field of work, I feel it is important to try to make things with my hands, regardless of how imperfect they are. Here's just a small taste of some of my hobbies.</p>
            <h2>Soap making</h2>
            <p>A popular hobby with friends; I make soap and bath bombs. Using melt-and-pour soaps is an easy way to get started with this, and it is great and fun to investigate different styles and techniques of soap making. It makes your flat smell great and gives you a constant stream of good presents to give people!</p>
            <>{images("soap", data.allFile.edges)}</>
            <h2>Cooking, baking, drinks</h2>
            <p>I've always been fascinated in making food and things like cocktails – perhaps it is a leftover from my background in chemistry. I like making new things, such as my own tonic water, macarons (which I'm trying to perfect), and water keffir.</p>
            <>{images("cooking", data.allFile.edges)}</>
            <h2>Hiking and adventuring</h2>
            <p>I'm the first to admit I'm not the most adventurous person. However I do like hiking and going on trips around little areas of Germany. I grew up in the countryside and really miss seeing fields, and getting hopelessly lost...</p>
            <>{images("hiking", data.allFile.edges)}</>
        </Layout>
    )
}

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "not-tech" } }) {
        edges {
            node {
                name
                childImageSharp {
                    fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
  } 
`

export default NotTech