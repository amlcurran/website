import React, { CSSProperties } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import { Url } from "url";
import { GraphQLList, Edge } from "../models/graphql";
import { MarkdownRemark } from "../models/remark";

interface TalksFrontmatter {
    title: string
    slides: string
    video?: Url
    image: string
    presentedAt: string
}

interface TalksQuery {
    allMarkdownRemark: GraphQLList<MarkdownRemark<TalksFrontmatter>>
    betterSwift
    lollipop
    betterCode
    codeWhispering
}

const talksStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    margin: -8
}

const talkStyle: CSSProperties = {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 350,
    margin: 8
}

const Talks = ({ data }: { data: TalksQuery }) => {
  console.log(data)
    const seo = <SEO title="Talks" keywords={[`talks`, `developer`, `engineer`, `mobile`, `ios`, `android`]} description="A summary of the talks I've done over my career" key="SEO"/>
    const talks = data.allMarkdownRemark.edges.map(asTalkElement(data))
    return (
        <Layout seo={seo}>
           <div style={talksStyle}>{talks}</div>
           <div />
        </Layout>
    )
}

function asTalkElement(query: TalksQuery): (edge: Edge<MarkdownRemark<TalksFrontmatter>>) => JSX.Element {
    return (edge) => (
      <div style={talkStyle}>
        <Img fluid={query[edge.node.frontmatter.image].childImageSharp.fluid} style={{height: 250}} />
        <h5>{edge.node.frontmatter.presentedAt}</h5>
        <h3>{edge.node.frontmatter.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: edge.node.html }} />
        <a href={edge.node.frontmatter.slides}>Slides</a>
      </div>  
    )
}

function imageForTalk(frontmatter: TalksFrontmatter): JSX.Element {
  return 
}

export const pageQuery = graphql`{
    allMarkdownRemark(sort: { order: DESC , fields: [frontmatter___start]},
        filter: {fileAbsolutePath: {glob: "**/talks-*.md"} }) {
      edges {
        node {
          html
          frontmatter {
            title
            slides
            presentedAt
            image
          }
        }
      }
    }
    betterSwift: file(relativePath: { eq: "better-swift.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    lollipop: file(relativePath: { eq: "lollipop-iplayer-2.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    betterCode: file(relativePath: { eq: "writing-better-code.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    codeWhispering: file(relativePath: { eq: "code-whispering-2.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Talks

export const betterSwift = graphql`
  fragment betterSwift on Query {
    file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const lollipop = graphql`
  fragment lollipop on Query {
    file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const betterCode = graphql`
  fragment betterCode on Query {
    file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export const codeWhispering = graphql`
  fragment codeWhispering on Query {
    file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

// const images = { 
//   "betterSwift": () => (
//     <StaticQuery
//       query={graphql`
//         query {
//           betterSwift: file(relativePath: { eq: "gatsby-astronaut.png" }) {
//             childImageSharp {
//               fluid(maxWidth: 300) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       `}
//       render={data => <Img fluid={data.betterSwift.childImageSharp.fluid} />}
//     />
//   ),

//   "codeWhispering": () => (
//     <StaticQuery
//       query={graphql`
//         query {
//           codeWhispering: file(relativePath: { eq: "gatsby-astronaut.png" }) {
//             childImageSharp {
//               fluid(maxWidth: 300) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       `}
//       render={data => <Img fluid={data.codeWhispering.childImageSharp.fluid} />}
//     />
//   ),

//   "lollipop": () => (
//     <StaticQuery
//       query={graphql`
//         query {
//           lollipop: file(relativePath: { eq: "gatsby-astronaut.png" }) {
//             childImageSharp {
//               fluid(maxWidth: 300) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       `}
//       render={data => <Img fluid={data.lollipop.childImageSharp.fluid} />}
//     />
//   ),

//   "betterCode": () => (
//     <StaticQuery
//       query={graphql`
//         query {
//           betterCode: file(relativePath: { eq: "gatsby-astronaut.png" }) {
//             childImageSharp {
//               fluid(maxWidth: 300) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       `}
//       render={data => <Img fluid={data.betterCode.childImageSharp.fluid} />}
//     />
//   )
// }