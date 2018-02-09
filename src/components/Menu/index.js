import React from 'react'
import Link from 'gatsby-link'
import glamor from 'glamorous';

//styled parts
const MenuBlock = glamor.div({
    'display': 'flex',
    'alignItems': 'center',
    'margin': '0 auto 12px auto',
    'backgroundColor': 'pink',
});

const MenuList = glamor.ul({
    'listStyle': 'none',
    'display': 'flex',
})

const MenuItem = glamor.li({
    'margin': '0 1em',
})


export default ({data}) => (
    <MenuBlock>
        <MenuList>{
            data.allMarkdownRemark.edges.map(({node}) => {
                const link = <Link to={node.fields.slug}>{node.fields.slug}</Link>
                return <MenuItem>{link}</MenuItem>
            })
        }</MenuList>
    </MenuBlock>
)