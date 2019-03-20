
interface Edge<T> {
    node: T
}

interface GraphQLList<T> {
    edges: Edge<T>[]
}