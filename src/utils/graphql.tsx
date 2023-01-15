import {IGatsbyImageData} from "gatsby-plugin-image"

export interface Edge<T> {
    node: T
}

export interface GraphQLList<T> {
    edges: Edge<T>[]
}

export interface SharpImage {
    childImageSharp: {
        resize?: { src: string }
        gatsbyImageData: IGatsbyImageData
    }
}
