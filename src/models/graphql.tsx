
export interface Edge<T> {
    node: T
}

export interface GraphQLList<T> {
    edges: Edge<T>[]
}