import React from "react"

import Layout from "../components/layout"
import {graphql, Link} from "gatsby";
import {Edge, GraphQLList, SharpImage} from "../utils/graphql";
import SEO from "../components/seo";
import {ImageRail} from "../components/image-rail";
import {OutboundLink} from "gatsby-plugin-google-gtag";
import {GatsbyImage, StaticImage} from "gatsby-plugin-image";

interface NotTechQuery {
    allFile: GraphQLList<SharpImage & File>
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    return (
        <Layout seo={seo}>
          <p style={{marginTop: 16}}>I try hard to make sure that I don't spend all my time on my computer. Whilst not easy in my field of work, I feel it is important to try to make things with my hands, regardless of how imperfect they are. Here's just a small taste of some of my hobbies.</p>
          <section style={{marginTop: 36}}>
            <h2>Pottery</h2>
            <p>One of my favourite exercises to <Link to="/articles/managing-stress">avoid stress</Link> is pottery.
              Having done a few courses over the last few years its starting to be something I really enjoy. Occasionally
              I've even combined my pottery with candle making and given a gift of a homemade candle in a homemade pot.
              As of Apr 2023, I'm spending some time at <OutboundLink href="https://www.turningearth.org/e10" target="_blank" rel="noopener noreferrer">Turning
                Earth</OutboundLink> and their studio, but I recommend <OutboundLink href="https://claytime.london" target="_blank" rel="noopener noreferrer">Claytime</OutboundLink> as well.</p>
            <div className="imageRow">
              <StaticImage src="../not-tech/pottery-one.jpeg" alt="Four pieces of pottery including a slab build" className="imageItem" />
              <StaticImage src="../not-tech/pottery-three.jpeg" alt="A pottery cylinder on the wheel" className="imageItem"/>
              <StaticImage src="../not-tech/pottery-four.jpg" alt="A glazed plate from pottery class" className="imageItem" />
            </div>
          </section>
          <section style={{marginTop: 36}}>
            <h2>Soap &amp; candles</h2>
            <p>A popular hobby with friends; I make soap and bath bombs. Using melt-and-pour soaps is an easy way to
                get started with this, and it is great and fun to investigate different styles and techniques of
                soap making. It makes your flat smell great and gives you a constant stream of good presents to give
                people!</p>
            <div className="imageRow">
              <StaticImage src="../not-tech/soap-cold-process-1.jpg" alt="" className="imageItem" />
              <StaticImage src="../not-tech/soap-bath-bombs.jpg" alt="" className="imageItem"/>
              <StaticImage src="../not-tech/soap-soap.jpg" alt="" className="imageItem" />
            </div>
          </section>
          <section style={{marginTop: 36}}>
              <h2>Art</h2>
              <p>I like trying new forms of art as something to unwind. I have tried subscribing to the art box <a
                  href="https://artful.co.uk" target="_blank" rel="noopener noreferrer">Artful</a> which is great –
                  boxes include lino printing and india ink.
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
                    gatsbyImageData(layout: CONSTRAINED,
                    transformOptions: {
                         fit: COVER, 
                         cropFocus: CENTER
                    })
                }
            }
        }
    }
  }
`

export default NotTech
