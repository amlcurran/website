import {OpenGraphProperties} from "open-graph-scraper";
import React from "react";
import "./previouslyOn.scss"

function previousPlace(previousOpenGraph: OpenGraphProperties): string {
    if (previousOpenGraph.ogUrl?.includes("freetrade")) {
        return "Freetrade blog"
    } else if (previousOpenGraph.ogUrl?.includes("novoda")) {
        return "Novoda Insights"
    } else {
        console.error(`Not sure where this previous URL is ${previousOpenGraph.ogUrl}`)
        return ""
    }
}

export interface PreviouslyOnCardProps {
    previousOpenGraph: OpenGraphProperties
    previous: string
}

export const PreviouslyOn = ({previousOpenGraph, previous}: PreviouslyOnCardProps) => {
    return (<div className="tiny-card">
        <img src={previousOpenGraph.ogImage.url} alt=""/>
        <div style={{paddingTop: 16, paddingBottom: 16}}>
            <i style={{marginBottom: 8}}>Previously posted on <a href={previous}>{previousPlace(previousOpenGraph)}</a>:</i>
            <h4>{previousOpenGraph.ogTitle}</h4>
            <div className="tiny-card-description">{previousOpenGraph.ogDescription}</div>
        </div>
    </div>)
}
