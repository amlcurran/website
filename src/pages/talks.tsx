import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface TalksQuery {
    
}

const Talks = ({ data }: { data: TalksQuery }) => {
    const seo = <SEO title="Talks" keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A summary of the talks I've done over my career" key="SEO"/>
    return (
        <Layout seo={seo}>
            Some talks will go here
            {}
        </Layout>
    )
}

export default Talks