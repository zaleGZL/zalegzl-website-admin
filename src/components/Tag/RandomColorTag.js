import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

// 标签颜色参数数组
const colors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

const randomColor = () => colors[Math.floor((Math.random() * 100) % 11)]

class RandomColorTag extends React.Component {
  constructor(props) {
    super(props)

    this.state = { color: randomColor() }
  }

  render() {
    const { children, ...props } = this.props
    return (
      <Tag {...props} color={this.state.color}>
        {children}
      </Tag>
    )
  }
}

RandomColorTag.propTypes = {
  children: PropTypes.node
}

export default RandomColorTag
