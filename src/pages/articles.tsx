import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface ArticlesQuery {
    
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Not tech" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO"/>
    return (
        <Layout seo={seo}>
            This part of my website will be coming soon...
            {}
        </Layout>
    )
}

export default Articles