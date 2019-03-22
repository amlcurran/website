import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface NotTechQuery {
    
}

const NotTech = ({ data }: { data: NotTechQuery }) => {
    return (
        <Layout>
            Interested in what I get up to when not doing tech?
            {}
        </Layout>
    )
}

export default NotTech