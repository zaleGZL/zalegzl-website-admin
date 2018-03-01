import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const StyledLoadingBG = styled.div`
  font-size: 50px;
  height: 100vh;

  background-color: rgba(255, 255, 255, 0.7);

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
`

const StyledLoadingContainer = styled.div`
  margin: auto;
  text-align: center;
  width: 150px;
`

const StyledLoadingText = styled.span`
  font-size: 15px;
  line-height: 1.5;
`

const LoadingPage = () => (
  <StyledLoadingBG>
    <StyledLoadingContainer>
      <Icon type="loading" />
      <br />
      <StyledLoadingText>LOADING</StyledLoadingText>
    </StyledLoadingContainer>
  </StyledLoadingBG>
)

export default LoadingPage
