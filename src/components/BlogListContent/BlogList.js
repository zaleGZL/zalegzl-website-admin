import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { List, Icon, Button, Popconfirm, message } from 'antd'
import { blogListPerPageCount, blogPagePrefix } from '../../constants'
import { RandomColorTag } from '../Tag'
import { requestDeleteBlog, requestGetBlogList } from '../../reducers/blogList'
import EditableBlogModal from './EditableBlogModal'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

class BlogList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 1,
      visibleBlogId: ''
    }

    this.confirmDelete = this.confirmDelete.bind(this)
    this.showVisibleModal = this.showVisibleModal.bind(this)
    this.clearVisibleBlogId = this.clearVisibleBlogId.bind(this)
  }

  clearVisibleBlogId() {
    this.setState({ visibleBlogId: '' })
  }

  showVisibleModal(visibleBlogId) {
    this.setState({ visibleBlogId })
  }

  confirmDelete(id) {
    this.props.requestDeleteBlog(id).then(status => {
      if (status === 'success') {
        message.success('博客删除成功')
        this.props.requestGetBlogList()
        this.props.history.push('/home')
      } else {
        message.error('博客删除失败')
      }
    })
  }

  render() {
    const { visibleBlogId } = this.state
    const { amount, list } = this.props
    const current = this.state.current
    const listStartIndex = (current - 1) * blogListPerPageCount
    const listEndIndex = listStartIndex + blogListPerPageCount
    const listData = list.slice(listStartIndex, listEndIndex)

    const pagination = {
      pageSize: blogListPerPageCount,
      current: current,
      total: amount,
      onChange: page => {
        this.setState({ current: page })
      }
    }

    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={pagination}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item._id}
            actions={[
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={() => this.confirmDelete(item._id)}
                okText="确定"
                cancelText="取消"
                getPopupContainer={() =>
                  document.getElementById('my-scroll-layout')
                }
              >
                <Button
                  size="small"
                  type="dashed"
                  style={{ borderColor: 'red', color: 'red' }}
                >
                  删除
                </Button>
              </Popconfirm>,
              <span>
                <Button
                  size="small"
                  type="dashed"
                  style={{ borderColor: 'blue', color: 'blue' }}
                  onClick={() => this.showVisibleModal(item._id)}
                >
                  编辑
                </Button>
                {visibleBlogId === item._id ? (
                  <EditableBlogModal
                    blog={item}
                    clearVisibleBlogId={this.clearVisibleBlogId}
                  />
                ) : (
                  undefined
                )}
              </span>,
              <IconText
                type="clock-circle-o"
                text={item.createTime.toLocaleString().slice(0, 10)}
              />,
              <IconText type="eye-o" text={item.viewTimes} />,
              <IconText
                type="tags-o"
                text={item.tags.map(tag => (
                  <RandomColorTag key={tag}>{tag}</RandomColorTag>
                ))}
              />,
              <IconText
                type="appstore-o"
                text={<RandomColorTag>{item.category}</RandomColorTag>}
              />
            ]}
          >
            <List.Item.Meta
              title={
                <a href={`${blogPagePrefix}/${item._id}`} target="_blank">
                  {item.title}
                </a>
              }
              description={item.summary}
            />
          </List.Item>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  amount: state.blogList.amount,
  list: state.blogList.list
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestDeleteBlog,
      requestGetBlogList
    },
    dispatch
  )

BlogList.propTypes = {
  amount: PropTypes.number,
  list: PropTypes.array,
  requestDeleteBlog: PropTypes.func,
  requestGetBlogList: PropTypes.func
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogList)
)
