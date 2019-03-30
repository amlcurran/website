import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

interface SideProjectsQuery {

}

const SideProjects = ({ data }: { data: SideProjectsQuery }) => {
  const seo = <SEO title="Not tech" keywords={[`side projects`, `flutter`, `tech`]} description="Here's what I get up to when I'm not coding" key="SEO" />
  return (
    <Layout seo={seo}>
      This part of my website will be coming soon...
            {}
    </Layout>
  )
}

export default SideProjects