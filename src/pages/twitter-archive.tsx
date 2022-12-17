import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {graphql} from "gatsby"
import {Edge, GraphQLList} from "../models/graphql"
import {MarkdownRemark} from "../models/remark"
import {Image} from "./articles"
import Styling from "../components/styling";

interface Tweet {
    id: string
    tweet: string
    date: number
}

interface TalksQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<Tweet>>
    allFile: GraphQLList<Image>
}

const TwitterArchive = ({ data }: { data: TalksQuery }) => {
    return (
        <Layout seo={<SEO title="Talks"
                          keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                          description="A summary of the talks I've done over my career" key="SEO"/>}>
            <div className="collapsingGrid">
                {
                    // data.allMarkdownRemark.edges
                    //     .map(edge => edge.node.frontmatter)
                        [{
                            id: "abcd",
                            tweet: "One thing I’d love to see from Apple (and Google gets very right) is much more sample code.\n\nThere’s things in that are easy UIKit but non-obvious in SwiftUI. StackOverflow is great but I’d love examples from the horses mouth more",
                            date: Date.parse("2022-04-12T12:08:00.000Z")
                        }, {
                            id: "efgh",
                            tweet: "We ran a SwiftUI workshop in the Freetrade mobile team this week. \n\nI enjoyed that the full range of feedback was \"this is awful\" all the way up to \"this is amazing\" \uD83D\uDE01",
                            date: Date.parse("2022-02-12T11:45:00.000Z")
                        }]
                        .map(tweet => <TweetElement edge={tweet} key={tweet.id}/>)
                }
            </div>
        </Layout>
    )
}

interface TalkElementProps {
    edge: Tweet
}

const TweetElement = ({edge}: TalkElementProps) => {
    return <Item tweet={edge} />
}

const Item = ({tweet} :{tweet: Tweet}) => {
    return (
        <section className={"card-internal card-total bordered readable-width"}>
            <div className="article-text">
                <caption>@amlcurran</caption>
                <p dangerouslySetInnerHTML={{__html: tweet.tweet}} className="no-links"/>
                <h4>{Intl.DateTimeFormat("default", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                }).format(tweet.date)}</h4>
            </div>
        </section>
    )
}

export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: DESC , fields: [frontmatter___date]},
        filter: {fileAbsolutePath: {glob: "**/talks-*.md"} }) {
      edges {
        node {
          html
          frontmatter {
            title
            slides
            presentedAt
            image
            video
          }
        }
      }
    }
    allFile(filter: {absolutePath: {regex: "/talks/.*\\.(png|jpg|jpeg)/"}}) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED,
              aspectRatio: 1.33,
              transformOptions: {
                 cropFocus:CENTER
              }
            )
          }
        }
      }
    }
  }
`

export default TwitterArchive
