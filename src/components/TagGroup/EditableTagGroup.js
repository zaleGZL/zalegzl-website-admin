import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tag, Input, Icon, message } from 'antd'
import { requestAddTag, requestDeleteTag } from '../../reducers/tags'
import { RandomColorTag } from '../Tag'

const StyledRandomColorTag = Styled(RandomColorTag)`
  &&& {
    margin-top: 10px;
  }
`

class EditableTagGroup extends React.Component {
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
    const hide = message.loading('标签添加中...')
    this.props.requestAddTag(inputValue).then(status => {
      // 隐藏 标签添加中... 信息
      hide()
      if (status === 'success') {
        setTimeout(() => message.success('标签添加成功', 1), 600)
        this.setState({ inputVisible: false, inputValue: '' })
      } else {
        setTimeout(() => message.error('标签添加失败', 1), 600)
        this.setState({ inputValue: '' })
      }
    })
  }

  saveInputRef(input) {
    this.input = input
  }

  async onClickClose(e, tag) {
    const hide = message.loading('标签删除中...')
    const status = await this.props.requestDeleteTag(tag)
    // 隐藏 标签删除中... 信息
    hide()
    if (status === 'success') {
      setTimeout(() => message.success('标签删除成功', 1), 600)
    } else {
      e.preventDefault()
      setTimeout(() => message.error('标签删除失败', 1), 600)
    }
  }

  render() {
    const { inputVisible, inputValue } = this.state
    const tags = this.props.tags

    return (
      <div>
        {tags.map((tag, index) => (
          <StyledRandomColorTag
            key={tag}
            closable={true}
            onClose={e => this.onClickClose(e, tag)}
          >
            {tag}
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
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestAddTag,
      requestDeleteTag
    },
    dispatch
  )

EditableTagGroup.propTypes = {
  tags: PropTypes.array,
  requestAddTag: PropTypes.func,
  requestDeleteTag: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableTagGroup)
