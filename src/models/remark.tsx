export interface Frontmatter {

}

export interface MarkdownRemark<FrontmatterType extends Frontmatter> {
    html: string
    excerpt?: string
    frontmatter: FrontmatterType
}