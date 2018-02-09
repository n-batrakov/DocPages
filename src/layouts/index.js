import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Menu from '../components/Menu'
import './index.css'

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet
      title="Docs"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    <Menu data={data}/>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>  
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
    query MenuItemsQuery {
        allMarkdownRemark {
            edges {
                node {
                    id
                    headings { value }
                    fields { slug }
                }
            }
        }
    }
`