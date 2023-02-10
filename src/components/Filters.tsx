import {Edge} from "../utils/graphql";
import {MarkdownRemark} from "../utils/remark";
import {Chip} from "./Chip";
import React from "react";
import {PortfolioFrontmatter} from "../pages/portfolio";
import {selectedTag} from "../utils/decodedHash";


export function Filters(props: { data: Edge<MarkdownRemark<PortfolioFrontmatter>>[] }) {
    return <div style={{}}>
        {allTags(props.data)
            .map(tag => <LocationChip tag={tag}/>)
        }
    </div>
}

function LocationChip({tag}: { tag: string }) {
    return <a href={`#${tag}`}>
        <Chip selected={selectedTag() == tag} style={{display: "inline-block"}}
              text={tag} closeLocation={'#'}/>
    </a>
}

function allTags(props: Edge<MarkdownRemark<PortfolioFrontmatter>>[]) {
    return new Array(...new Set(
        props.flatMap(portfolio => portfolio.node.frontmatter.tags)
    ))
}
