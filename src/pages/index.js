import React from "react";
import g from "glamorous";
import Link from "gatsby-link";

import { rhythm } from "../utils/typography";
export default ({ data }) => {
  return (
    <div>
      <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
        Entries
      </g.H1>
      {data.allMarkdownRemark.edges.map(({ node }) =>
        <div key={node.id}>
          <Link to={node.fields.slug} css={{ textDecoration: `none`, color: `inherit` }}>
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.fields.slug}{" "}
            </g.H3>
            <p>
              {node.excerpt}
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`