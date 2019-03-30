import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout seo={<SEO title="404: Not found" description="How did you get here?" />}>
    <h3>How did you get here?</h3>
    <p>It seems you got somewhere where there isn't anything. Well done! But you might want to head back to more fruitful pages.</p>
  </Layout>
)

export default NotFoundPage
