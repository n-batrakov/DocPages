import React from 'react'
import Link from 'gatsby-link'

export default ({data}) => (
    <div>
        <ul>{
            data.allMarkdownRemark.edges.map(({node}) => {
                const link = <Link to={node.fields.slug}>{node.fields.slug}</Link>
                return <li>{link}</li>
            })
        }</ul>
    </div>
)