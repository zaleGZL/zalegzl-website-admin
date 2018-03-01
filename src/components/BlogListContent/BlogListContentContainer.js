import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoadingContent } from '../Content'
import { requestGetBlogList } from '../../reducers/blogList'
import BlogListContent from './BlogListContent'

class BlogListContentContainer extends React.Component {
  componentDidMount() {
    this.props.requestGetBlogList()
  }
  render() {
    const status = this.props.status
    // 检测博客列表数据是否获取到了
    return status !== 'success' ? (
      <LoadingContent status={status} />
    ) : (
      <BlogListContent />
    )
  }
}

const mapStateToProps = state => ({
  status: state.blogList.status
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestGetBlogList
    },
    dispatch
  )

BlogListContentContainer.propTypes = {
  status: PropTypes.string,
  requestGetBlogList: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  BlogListContentContainer
)
