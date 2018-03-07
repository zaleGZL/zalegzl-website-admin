import React from 'react'
import { Divider } from 'antd'
import Styled from 'styled-components'
import ResumeInput from './ResumeInput'
import { Layout } from 'antd'
const { Content } = Layout

const StyledContent = Styled(Content) `
  &&& {
    margin: 24px;
    padding: 30px;
    background: #fff;
  }
`
const MineContent = () => (
    <StyledContent>
        <h3>我的</h3>
        <Divider dashed />
        <ResumeInput />
    </StyledContent>
)

export default MineContent
