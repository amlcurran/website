import {Edge} from "../utils/graphql";
import {MarkdownRemark} from "../utils/remark";
import {Chip} from "./Chip";
import React from "react";
import {PortfolioFrontmatter} from "../pages/portfolio";
import {filterParam} from "../utils/filterParam";


export function Filters(props: { data: Edge<MarkdownRemark<PortfolioFrontmatter>>[] }) {
    return <div className="filter-container">
        Filter by:
        {allTags(props.data)
            .sort()
            .map(tag => <LocationChip key={tag} tag={tag}/>)
        }
    </div>
}

function LocationChip({tag}: { tag: string }) {
    let selected = filterParam() == tag;
    return <a href={`?filter=${tag}`}>
        <Chip style={{display: "inline-block"}}
              selected={selected}
              text={tag}
              closeButton={
                  {
                      closeLocation: "?",
                      visible: selected
                  }
              }/>
    </a>
}

function allTags(props: Edge<MarkdownRemark<PortfolioFrontmatter>>[]) {
    return new Array(...new Set(
        props.flatMap(portfolio => portfolio.node.frontmatter.tags)
    ))
}
