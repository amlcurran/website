import {parseFilterQuery} from "../utils/filterParam";
import {PortfolioFrontmatter, PortfolioQuery} from "../pages/portfolio";
import {Edge} from "../utils/graphql";
import {MarkdownRemark} from "../utils/remark";
import {CardTextProps} from "../components/smallCard";
import React from "react";
const data = require('./portfolio-small.json') as PortfolioSmall[]

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

    older(): CardTextProps[] {
        const filter = parseFilterQuery(this.location)
        return data.map((small) => {
            return {
                title: small.title,
                text: small.description,
                subtitle: `${small.position} ● ${small.year}`,
                lowerPriority: !(small.tags.includes(filter) || filter.length == 0)
            }
        })
    }

    newer(): PortfolioLargeViewState[] {
        return this.data.allMarkdownRemark.edges.map((edge, index) => this.asPortfolioExcerpt(edge, index))
    }

    asPortfolioExcerpt({ node }: Edge<MarkdownRemark<PortfolioFrontmatter>>, index: number): PortfolioLargeViewState {
        const filter = parseFilterQuery(this.location)
        return {
            title: node.frontmatter.title,
            text: node.html,
            subtitle: node.frontmatter.position + " ● " + node.frontmatter.date,
            lowerPriority: !(node.frontmatter.tags.includes(filter) || filter.length == 0),
            imageOnRight: index % 2 == 1,
            image: imageType(node, index)
        }
    }

}

function imageType(node: MarkdownRemark<PortfolioFrontmatter>, index: number): PortfolioDoubleImage | PortfolioSingleImage {
    if (node.frontmatter.secondImage) {
        return {
            key: node.id,
            first: node.frontmatter.images[0],
            second: node.frontmatter.secondImage,
            expandRight: index % 2 == 1
        }
    } else {
        return node.frontmatter.images[0]
    }
}

interface PortfolioLargeViewState extends CardTextProps {
    imageOnRight: boolean
    image: PortfolioDoubleImage | PortfolioSingleImage
}

export interface PortfolioDoubleImage {
    key: string
    first: string
    second: string
    expandRight: boolean
}

export type PortfolioSingleImage = string

function allTags(props: Edge<MarkdownRemark<PortfolioFrontmatter>>[]) {
    return new Array(...new Set(
      props.flatMap(portfolio => portfolio.node.frontmatter.tags)
    ))
}