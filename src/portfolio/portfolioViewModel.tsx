import {matchesFilter} from "gatsby/dist/datastore/lmdb/query/common";
import {filterParam, parseFilterQuery} from "../utils/filterParam";

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
    constructor(readonly location: Location | undefined) {

    }


    older(): PortfolioSmallViewState[] {
        const data: PortfolioSmall[] = require('../portfolio/portfolio-small.json')
        const filter = parseFilterQuery(location)
        return data.map((small) => {
            return {
                ...small,
                matchesFilter: small.tags.includes(filter) || filter.length == 0
            }
        })
    }

}