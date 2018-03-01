import React from 'react'
import { Divider } from 'antd'
import Styled from 'styled-components'
import WriteBlogInputGroup from './WriteBlogInputGroup'
import { Layout } from 'antd'
const { Content } = Layout

const StyledContent = Styled(Content)`
  &&& {
    margin: 24px;
    padding: 30px;
    background: #fff;
  }
`
const WriteBlogContent = () => (
  <StyledContent>
  <h3>写博客</h3>
    <Divider dashed />
    <WriteBlogInputGroup />
  </StyledContent>
)

export default WriteBlogContent
