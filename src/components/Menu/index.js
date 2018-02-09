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


export default ({items}) => (
    <MenuBlock>
        <MenuList>
            {
                items.map(x => 
                    <MenuItem> {x} </MenuItem>
                )
            }
        </MenuList>
    </MenuBlock>
)