import React from 'react'
import Link from 'gatsby-link'

export default ({items}) => (
    <div>
        <ul>{items.map(x => <li>{x}</li>)}</ul>
    </div>
)