import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface ArticlesQuery {
    
}

const Articles = ({ data }: { data: ArticlesQuery }) => {
    const seo = <SEO title="Not tech" keywords={[`articles`, `blog`, `vlog`, `tech`, `thoughts`]} description="Articles and piece I've written" key="SEO"/>
    return (
        <Layout seo={seo}>
            <p>All my new articles will be released here, but right now there aren't any. </p>
            <p>Check my <a href="https://www.medium.com/@amlcurran" target="_blank">Medium</a> account for older ones.</p>
        </Layout>
    )
}

export default Articles