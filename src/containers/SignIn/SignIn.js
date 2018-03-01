import React from 'react'
import styled from 'styled-components'

import SignInForm from './SignInForm'
import adminImg from '../../assets/admin.svg'

const StyledContainer = styled.div`
  height: 100vh;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  justify-content: center;
  align-items: center;
`

const StyledContentContainer = styled.div`
  width: 320px;
  height: 320px;
  padding: 30px;
  background-color: #f6f6f6;
  border: 1px solid #d8d8d8;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  text-align: center;
`

class SignIn extends React.Component {
  render() {
    return (
      <StyledContainer>
        <StyledContentContainer>
          <img src={adminImg} alt="admin" />
          <SignInForm />
        </StyledContentContainer>
      </StyledContainer>
    )
  }
}

export default SignIn
