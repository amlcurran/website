import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {graphql} from "gatsby"
import {GraphQLList} from "../models/graphql"
import {MarkdownRemark} from "../models/remark"
import {Image} from "./articles"
const tweetJson = require("../twitter-archive/tweets.json") as TweetJsonElement[]

interface Tweet {
    id: string
    full_text: string
    created_at: string
}

interface TweetJsonElement {
    tweet: Tweet
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
            <p style={{marginTop: 16}}>Since Elon has taken over Twitter I've decided to stop using it. Here is an archive of all my previous tweets which are no longer available there.</p>
            <div className="collapsingGrid">
                {
                    tweetJson
                        .map(tweet => <TweetElement edge={tweet.tweet} key={tweet.tweet.id}/>)
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
            <div className="article-text" style={{width: "100%"}}>
                <caption>@amlcurran</caption>
                <p dangerouslySetInnerHTML={{__html: tweet.full_text}} className="no-links"/>
                <h4>{Intl.DateTimeFormat("default", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                }).format(Date.parse(tweet.created_at))}</h4>
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
