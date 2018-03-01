import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Input, Select, message, Modal, Button } from 'antd'
import { requestUpdateBlog, requestGetBlogList } from '../../reducers/blogList'
const { TextArea } = Input
const Option = Select.Option

class EditableBlogModal extends React.Component {
  constructor(props) {
    super(props)

    const blog = this.props.blog

    this.state = {
      blog: {
        ...blog
      },
      loading: false,
      visible: true
    }

    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  onInputChange(e, name) {
    this.setState({ blog: { ...this.state.blog, [name]: e.target.value } })
  }
  handleSelectChange(name, value) {
    this.setState({ blog: { ...this.state.blog, [name]: value } })
  }

  handleOk() {
    this.setState({ loading: true })
    this.props.requestUpdateBlog(this.state.blog).then(status => {
      if (status === 'success') {
        message.success('文章更新成功')
        setTimeout(() => {
          this.setState({ visible: false })
          this.props.requestGetBlogList()
          this.props.history.push('/home')
        }, 300)
      } else {
        this.setState({ loading: false })
        message.error('文章更新失败')
      }
    })
  }

  handleCancel() {
    this.setState({ visible: false })
    this.props.clearVisibleBlogId()
  }

  render() {
    const { blog, loading, visible } = this.state
    const { tags, categories } = this.props

    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="取消" onClick={this.handleCancel}>
            取消
          </Button>,
          <Button
            key="提交"
            type="primary"
            loading={loading}
            onClick={this.handleOk}
          >
            提交
          </Button>
        ]}
      >
        <div>
          <Input
            placeholder="标题"
            value={blog.title}
            onChange={e => this.onInputChange(e, 'title')}
            style={{ marginTop: '35px' }}
          />
          <Select
            mode="multiple"
            style={{ width: '100%', marginTop: '10px' }}
            placeholder="选择标签"
            onChange={value => this.handleSelectChange('tags', value)}
            value={blog.tags}
          >
            {tags.map(tag => <Option key={tag}>{tag}</Option>)}
          </Select>
          <Select
            placeholder="选择分类"
            onChange={value => this.handleSelectChange('category', value)}
            style={{ width: '100%', marginTop: '10px' }}
            value={blog.category}
          >
            {categories.map(category => (
              <Option key={category}>{category}</Option>
            ))}
          </Select>
          <TextArea
            placeholder="文章概要"
            value={blog.summary}
            onChange={e => this.onInputChange(e, 'summary')}
            autosize={{ minRows: 4, maxRows: 5 }}
            style={{ marginTop: '10px' }}
          />
          <TextArea
            placeholder="markdown格式的文章内容"
            value={this.state.blog.markdownContent}
            onChange={e => this.onInputChange(e, 'markdownContent')}
            autosize={{ minRows: 6, maxRows: 8 }}
            style={{ marginTop: '10px' }}
          />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.blogList.tags,
  categories: state.blogList.categories
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestUpdateBlog,
      requestGetBlogList
    },
    dispatch
  )

EditableBlogModal.propTypes = {
  tags: PropTypes.array,
  categories: PropTypes.array,
  blog: PropTypes.object,
  clearVisibleBlogId: PropTypes.func,
  requestUpdateBlog: PropTypes.func,
  requestGetBlogList: PropTypes.func
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditableBlogModal)
)
