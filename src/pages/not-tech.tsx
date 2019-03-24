import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface NotTechQuery {
    
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    const seo = <SEO title="Not tech" keywords={[`hands`, `developer`, `engineer`, `pottery`,`soap`]} description="Here's what I get up to when I'm not coding" key="SEO"/>
    return (
        <Layout seo={seo}>
            This part of my website will be coming soon...
            {}
        </Layout>
    )
}

export default NotTech