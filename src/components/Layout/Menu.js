import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Menu, Icon } from 'antd'

import { domainSubDir } from '../../constants'

const StyledLogoDiv = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`

const renderMenus = menus =>
  menus.map(item => (
    <Menu.Item key={item.key}>
      <Link to={item.to}>
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </Link>
    </Menu.Item>
  ))

// 获取菜单中当前选中的菜单项的key
const getSelectedKeys = menus => {
  const pathname = window.location.pathname
  for (let item of menus) {
    const regExpPathname = new RegExp('^' + domainSubDir + item.to)
    if (regExpPathname.test(pathname)) {
      return [item.key]
    }
  }
  // 未匹配到，返回首页的key
  return [menus[0].key]
}

class MenuCustom extends Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys(this.props.menus)}
      >
        <StyledLogoDiv />
        {renderMenus(this.props.menus)}
      </Menu>
    )
  }
}

MenuCustom.propTypes = {
  menus: PropTypes.array
}

export default MenuCustom
