import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestDeleteToken } from '../../reducers/auth'
import styled from 'styled-components'

import { Layout, Icon, Button, message } from 'antd'
const { Header } = Layout

const StyledHeader = styled(Header)`
  background-color: #fff !important;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  display: flex;
  justify-content: space-between;
  padding: 0 !important;
`

const StyledIcon = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
`

const StyledButton = styled(Button)`
  margin: 15px 16px 0 16px;
`

class HeaderCustom extends Component {
  constructor(props) {
    super(props)

    this.onSignOutClick = this.onSignOutClick.bind(this)
  }

  onSignOutClick() {
    this.props.requestDeleteToken().then(state => {
      if (state === true) {
        message.info('账号退出成功!')
      } else {
        message.info('账号退出失败!')
      }
    })
  }

  render() {
    const { collapsed, toggle } = this.props
    return (
      <StyledHeader>
        <div>
          <StyledIcon
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </div>
        <div>
          <StyledButton onClick={this.onSignOutClick}>登出</StyledButton>
        </div>
      </StyledHeader>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestDeleteToken
    },
    dispatch
  )

HeaderCustom.propTypes = {
  collapsed: PropTypes.bool,
  toggle: PropTypes.func,
  requestDeleteToken: PropTypes.func
}

export default connect(null, mapDispatchToProps)(HeaderCustom)
