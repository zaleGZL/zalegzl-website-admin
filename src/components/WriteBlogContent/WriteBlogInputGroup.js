import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Input, Select, Button, message } from 'antd'
import { requestCreateBlog } from '../../reducers/writeBlog'

const { TextArea } = Input
const Option = Select.Option

const StyledInputGroupContainer = Styled.div`
  max-width: 450px;
  margin: 15px auto;
`

class WriteBlogInputGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      summary: '',
      markdownContent: '',
      tags: [],
      category: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  }
  onInputChange(e, name) {
    this.setState({ [name]: e.target.value })
  }
  handleSelectChange(name, value) {
    this.setState({ [name]: value })
  }
  onButtonClick() {
    const hide = message.loading('发布中...')
    this.props.requestCreateBlog(this.state).then(status => {
      // 隐藏 发布中... 信息
      hide()
      if (status === 'success') {
        setTimeout(() => {
          message.success('发布成功', 1)
          this.props.history.push('/home')
        }, 600)
      } else {
        setTimeout(() => message.success('发布失败', 1), 600)
      }
    })
  }

  render() {
    const { tags, categories } = this.props
    return (
      <StyledInputGroupContainer>
        <Input
          placeholder="标题"
          value={this.state.title}
          onChange={e => this.onInputChange(e, 'title')}
          style={{ marginTop: '10px' }}
        />
        <Select
          mode="multiple"
          style={{ width: '100%', marginTop: '10px' }}
          placeholder="选择标签"
          onChange={value => this.handleSelectChange('tags', value)}
          getPopupContainer={() => document.getElementById('my-scroll-layout')}
        >
          {tags.map(tag => <Option key={tag}>{tag}</Option>)}
        </Select>
        <Select
          placeholder="选择分类"
          onChange={value => this.handleSelectChange('category', value)}
          style={{ width: '100%', marginTop: '10px' }}
          getPopupContainer={() => document.getElementById('my-scroll-layout')}
        >
          {categories.map(category => (
            <Option key={category}>{category}</Option>
          ))}
        </Select>
        <TextArea
          placeholder="文章概要"
          value={this.state.summary}
          onChange={e => this.onInputChange(e, 'summary')}
          autosize={{ minRows: 4, maxRows: 5 }}
          style={{ marginTop: '10px' }}
        />
        <TextArea
          placeholder="markdown格式的文章内容"
          value={this.state.markdownContent}
          onChange={e => this.onInputChange(e, 'markdownContent')}
          autosize={{ minRows: 6, maxRows: 8 }}
          style={{ marginTop: '10px' }}
        />

        <Button
          type="primary"
          style={{ marginTop: '15px', width: '100%' }}
          onClick={this.onButtonClick}
        >
          发布
        </Button>
      </StyledInputGroupContainer>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.writeBlog.tags,
  categories: state.writeBlog.categories
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCreateBlog
    },
    dispatch
  )

WriteBlogInputGroup.propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array,
  requestCreateBlog: PropTypes.func
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WriteBlogInputGroup)
)
