import {matchesFilter} from "gatsby/dist/datastore/lmdb/query/common";
import {filterParam, parseFilterQuery} from "../utils/filterParam";
import {PortfolioFrontmatter, PortfolioQuery} from "../pages/portfolio";
import {Edge} from "../utils/graphql";
import {MarkdownRemark} from "../utils/remark";

// Unexport once moved PortfolioFM into this file
export interface PortfolioSmall {
    title: string
    images: string[]
    position: string
    description: string
    year: string
    tags: string[]
}

export interface PortfolioSmallViewState {
    title: string
    images: string[]
    position: string
    description: string
    year: string
    tags: string[]
    matchesFilter: boolean
}

export class PortfolioViewModel {
    constructor(readonly location: Location | undefined, readonly data: PortfolioQuery) {

    }

    tags(): string[] {
        return allTags(this.data.allMarkdownRemark.edges)
          .sort()
    }

    older(): PortfolioSmallViewState[] {
        const data: PortfolioSmall[] = require('../portfolio/portfolio-small.json')
        const filter = parseFilterQuery(this.location)
        return data.map((small) => {
            return {
                ...small,
                matchesFilter: small.tags.includes(filter) || filter.length == 0
            }
        })
    }

}

function allTags(props: Edge<MarkdownRemark<PortfolioFrontmatter>>[]) {
    return new Array(...new Set(
      props.flatMap(portfolio => portfolio.node.frontmatter.tags)
    ))
}