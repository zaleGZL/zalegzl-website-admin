import React from 'react'
import { Divider } from 'antd'
import Styled from 'styled-components'
import { EditableCategoryGroup } from '../CategoryGroup'
import { Layout } from 'antd'
const { Content } = Layout

const StyledContent = Styled(Content)`
  &&& {
    margin: 24px;
    padding: 30px;
    background: #fff;
    min-height: 700px;
  }
`

const CategoryContent = () => (
  <StyledContent>
    <h3>分类</h3>
    <Divider dashed />
    <EditableCategoryGroup />
  </StyledContent>
)

export default CategoryContent
