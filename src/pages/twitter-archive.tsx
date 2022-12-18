import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
const tweetJson = require("../twitter-archive/tweets.json") as TweetJsonElement[]

interface Tweet {
    id: string
    full_text: string
    created_at: string
    in_reply_to_status_id?: string
    retweet_count: string
    favorite_count: string
}

interface Parsing {
    retweet?: {
        origin: string
    }
}

function parsedTweet(tweet: Tweet): Tweet & Parsing {
    if (tweet.full_text.indexOf("RT ") == 0) {
        const retweetRegex = /RT @(.*?):/
        const regExpExecArray = retweetRegex.exec(tweet.full_text)
        const origin = regExpExecArray![1]
        return {
            ...tweet,
            full_text: tweet.full_text.replace(retweetRegex, ""),
            retweet: {
                origin: origin
            }
        }
    } else {
        return tweet
    }
}

interface TweetJsonElement {
    tweet: Tweet
}

const TwitterArchive = () => {
    return (
        <Layout seo={<SEO title="Tweets"
                          keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]}
                          description="An archive of my tweets since deleted from Twitter" key="SEO"/>}>
            <p style={{marginTop: 16}}>Since Elon has taken over Twitter I've decided to stop using it. Here is an archive of all my previous tweets which are no longer available there.</p>
            <div className="collapsingGrid">
                {
                    tweetJson
                        .filter(tweet => tweet.tweet.in_reply_to_status_id === undefined)
                        .sort((a, b) => Date.parse(b.tweet.created_at) - Date.parse(a.tweet.created_at))
                        .map(tweet => <TweetElement tweet={parsedTweet(tweet.tweet)} key={tweet.tweet.id}/>)
                }
            </div>
        </Layout>
    )
}

interface TalkElementProps {
    tweet: Tweet & Parsing
}

function topLine(tweet: Tweet & Parsing) {
    if (tweet.retweet) {
        return <div style={{opacity: 0.6}}>@amlcurran <span className="material-icons-round md-18">repeat</span> @{tweet.retweet.origin}</div>
    } else {
        return <>
            <caption style={{opacity: 0.6}}>@amlcurran</caption>
        </>
    }
}

const TweetElement = ({tweet}: TalkElementProps) => {
    return (
        <section className={"card-internal card-total bordered readable-width"}>
            <div className="article-text" style={{width: "100%"}} id={"tweet-" + tweet.id}>
                {topLine(tweet)}
                <p dangerouslySetInnerHTML={{__html: tweet.full_text}} className="no-links"/>
                <h4>{Intl.DateTimeFormat("default", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                }).format(Date.parse(tweet.created_at))}</h4>
                <div style={{opacity: 0.6}}>
                    <span className="material-icons-round md-18">repeat</span>
                    {tweet.retweet_count}
                    <span className="material-icons-round md-18" style={{paddingLeft: 8}}>star</span>
                    {tweet.favorite_count}
                </div>
            </div>
        </section>
    )
}



export default TwitterArchive
