import React from 'react'
import { Divider } from 'antd'
import Styled from 'styled-components'
import BlogList from './BlogList'
import { Layout } from 'antd'
const { Content } = Layout

const StyledContent = Styled(Content)`
  &&& {
    margin: 24px;
    padding: 30px;
    background: #fff;
  }
`
const BlogListContent = () => (
  <StyledContent>
    <h3>博客列表</h3>
    <Divider dashed />
    <BlogList />
  </StyledContent>
)

export default BlogListContent
