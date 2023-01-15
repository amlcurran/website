export interface Frontmatter {

}

export interface MarkdownRemark<FrontmatterType extends Frontmatter> {
    html: string
    excerpt?: string
    timeToRead?: number
    id: string
    frontmatter: FrontmatterType
}