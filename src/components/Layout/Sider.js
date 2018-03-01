import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'

import { Layout } from 'antd'
const { Sider } = Layout

class SiderCustom extends Component {
  render() {
    const { menus, ...props } = this.props
    return (
      <Sider {...props}>
        <Menu menus={menus} />
      </Sider>
    )
  }
}

SiderCustom.propTypes = {
  menus: PropTypes.array
}

export default SiderCustom
