import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { Layout } from 'antd'
import { Spin } from 'antd'

const { Content } = Layout

const StyledContent = Styled(Content)`
   &&& {
    margin: 24px;
    padding: 24px;
    background-color: #fff;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
   }
`

const LoadingContent = ({ status }) => (
  <StyledContent>
    <div>
      <Spin size="large" />
      <br />
      <br />
      {status !== 'failure' ? '加载中...' : '加载数据失败，请刷新页面重试'}
    </div>
  </StyledContent>
)

LoadingContent.propTypes = {
  status: PropTypes.string
}

export default LoadingContent
