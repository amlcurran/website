import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface TalksQuery {
    
}

const Talks = ({ data }: { data: TalksQuery }) => {
    return (
        <Layout>
            Some talks will go here
            {}
        </Layout>
    )
}

export default Talks