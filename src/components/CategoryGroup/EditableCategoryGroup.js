import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tag, Input, Icon, message } from 'antd'
import {
  requestAddCategory,
  requestDeleteCategory
} from '../../reducers/categories'

import { RandomColorTag } from '../Tag'

const StyledRandomColorTag = Styled(RandomColorTag)`
  &&& {
    margin-top: 10px;
  }
`

class EditableCategoryGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputVisible: false,
      inputValue: ''
    }

    this.showInput = this.showInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputConfirm = this.handleInputConfirm.bind(this)
    this.saveInputRef = this.saveInputRef.bind(this)
    this.onClickClose = this.onClickClose.bind(this)
  }

  showInput() {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm() {
    const inputValue = this.state.inputValue
    if (inputValue === '') {
      this.setState({ inputVisible: false })
      return
    }
    const hide = message.loading('分类添加中...')
    this.props.requestAddCategory(inputValue).then(status => {
      // 隐藏 分类添加中... 信息
      hide()
      if (status === 'success') {
        setTimeout(() => message.success('分类添加成功', 1), 600)
        this.setState({ inputVisible: false, inputValue: '' })
      } else {
        setTimeout(() => message.error('分类添加失败', 1), 600)
        this.setState({ inputValue: '' })
      }
    })
  }

  saveInputRef(input) {
    this.input = input
  }

  async onClickClose(e, category) {
    const hide = message.loading('分类删除中...')
    const status = await this.props.requestDeleteCategory(category)
    // 隐藏 分类删除中... 信息
    hide()
    if (status === 'success') {
      setTimeout(() => message.success('分类删除成功', 1), 600)
    } else {
      e.preventDefault()
      setTimeout(() => message.error('分类删除失败', 1), 600)
    }
  }

  render() {
    const { inputVisible, inputValue } = this.state
    const categories = this.props.categories

    return (
      <div>
        {categories.map((category, index) => (
          <StyledRandomColorTag
            key={category}
            closable={true}
            onClose={e => this.onClickClose(e, category)}
          >
            {category}
          </StyledRandomColorTag>
        ))}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{
              background: '#fff',
              borderStyle: 'dashed',
              marginTop: '10px'
            }}
          >
            <Icon type="plus" /> New Category
          </Tag>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestAddCategory,
      requestDeleteCategory
    },
    dispatch
  )

EditableCategoryGroup.propTypes = {
  categories: PropTypes.array,
  requestAddCategory: PropTypes.func,
  requestDeleteCategory: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EditableCategoryGroup
)
