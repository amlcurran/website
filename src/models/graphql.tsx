import { FluidObject, FixedObject } from "gatsby-image";

export interface Edge<T> {
    node: T
}

export interface GraphQLList<T> {
    edges: Edge<T>[]
}

export interface SharpImage {
    childImageSharp: {
        fluid?: FluidObject
        fixed?: FixedObject
    }
}
