import React from 'react'
import { Divider } from 'antd'
import Styled from 'styled-components'
import { EditableTagGroup } from '../TagGroup'
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

const TagContent = () => (
  <StyledContent>
    <h3>标签</h3>
    <Divider dashed />
    <EditableTagGroup />
  </StyledContent>
)

export default TagContent
