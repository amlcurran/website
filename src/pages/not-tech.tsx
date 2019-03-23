import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface NotTechQuery {
    
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    const seo = <SEO title="Not tech" keywords={[`hands`, `developer`, `engineer`, `pottery`,`soap`]} description="Here's what I get up to when I'm not coding" key="SEO"/>
    return (
        <Layout seo={seo}>
            Interested in what I get up to when not doing tech?
            {}
        </Layout>
    )
}

export default NotTech