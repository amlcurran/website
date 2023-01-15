import React from "react"

import Layout from "../components/layout"
import {graphql} from "gatsby";
import {Edge, GraphQLList, SharpImage} from "../utils/graphql";
import SEO from "../components/seo";
import {ImageRail} from "../components/image-rail";

interface NotTechQuery {
    allFile: GraphQLList<SharpImage & File>
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    return (
        <Layout seo={seo}>
            <p style={{marginTop: 16}}>I try hard to make sure that I don't spend all my time on my computer. Whilst not easy in my field of work, I feel it is important to try to make things with my hands, regardless of how imperfect they are. Here's just a small taste of some of my hobbies.</p>
            <section style={{marginTop: 36}}>
                <h2>Soap &amp; candles</h2>
                <p>A popular hobby with friends; I make soap and bath bombs. Using melt-and-pour soaps is an easy way to
                    get started with this, and it is great and fun to investigate different styles and techniques of
                    soap making. It makes your flat smell great and gives you a constant stream of good presents to give
                    people!</p>
                <ImageRail images={imagesWithName(data.allFile.edges, "soap")}/>
            </section>
            <section style={{marginTop: 36}}>
                <h2>Art</h2>
                <p>I like trying new forms of art as something to unwind. I have tried subscribing to the art box <a
                    href="https://artful.co.uk" target="_blank" rel="noopener noreferrer">Artful</a> which is great –
                    boxes include lino printing and india ink. I have been trying out pottery courses at <a
                        href="https://claytime.london" target="_blank" rel="noopener noreferrer">Claytime</a> as well.
                </p>
                <ImageRail images={imagesWithName(data.allFile.edges, "art")}/>
            </section>
            <section style={{marginTop: 36}}>
                <h2>Cooking, baking, drinks</h2>
                <p>I've always been fascinated in making food and things like cocktails – perhaps it is a leftover from
                    my background in chemistry. I like making new things, such as my own tonic water, macarons (which
                    I'm trying to perfect), and water keffir.</p>
                <ImageRail images={imagesWithName(data.allFile.edges, "cooking")}/>
            </section>
            <section style={{marginTop: 36}}>
                <h2>Hiking and adventuring</h2>
                <p>I'm the first to admit I'm not the most adventurous person. However I do like hiking and going on
                    trips around little areas of Germany. I grew up in the countryside and really miss seeing fields,
                    and getting hopelessly lost...</p>
                <ImageRail images={imagesWithName(data.allFile.edges, "hiking")}/>
            </section>
        </Layout>
    )
}

function imagesWithName(notTechBits: Edge<SharpImage & File>[], name: string) {
    return notTechBits.filter((edge) => edge.node.name.indexOf(name) !== -1);
}

const seo = <SEO
    title="Not tech"
    keywords={[`hands`, `developer`, `engineer`, `pottery`, `soap`]}
    description="Here's what I get up to when I'm not coding"
    key="SEO" />

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "not-tech" } }) {
        edges {
            node {
                name
                childImageSharp {
                    gatsbyImageData(layout: CONSTRAINED)
                }
            }
        }
    }
  } 
`

export default NotTech