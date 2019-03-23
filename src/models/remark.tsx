export interface Frontmatter {

}

export interface MarkdownRemark<FrontmatterType extends Frontmatter> {
    html: string
    frontmatter: FrontmatterType
}