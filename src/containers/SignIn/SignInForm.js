import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestVerifySignInInfo } from '../../reducers/signIn'

import { Form, Icon, Input, Button, message } from 'antd'
const FormItem = Form.Item

const StyledForm = styled(Form)`
  padding: 45px 15px;
`

const StyledSignInButton = styled(Button)`
  width: 100%;
`

class SignInForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, signInInfo) => {
      if (!err) {
        // 发送验证登录信息请求
        this.props
          .requestVerifySignInInfo(signInInfo.account, signInInfo.password)
          .then(status => {
            if (status === false) {
              message.error('账号或密码有误，请重新输入!')
            }
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { signInStatus } = this.props

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入账号!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="账号"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          <StyledSignInButton
            type="primary"
            htmlType="submit"
            loading={signInStatus === 'pending' ? true : false}
          >
            {signInStatus === 'pending' ? '登录中...' : '登录'}
          </StyledSignInButton>
        </FormItem>
      </StyledForm>
    )
  }
}

const WrappedSignInForm = Form.create()(SignInForm)

const mapStateToProps = state => ({
  signInStatus: state.signInStatus
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestVerifySignInInfo
    },
    dispatch
  )

WrappedSignInForm.propTypes = {
  signInStatus: PropTypes.string,
  requestVerifySignInInfo: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSignInForm)
