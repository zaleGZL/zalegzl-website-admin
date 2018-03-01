import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoadingContent } from '../Content'
import { requestGetTagsAndCategories } from '../../reducers/writeBlog'
import WriteBlogContent from './WriteBlogContent'

class WriteBlogContentContainer extends React.Component {
  componentDidMount() {
    this.props.requestGetTagsAndCategories()
  }
  render() {
    const status = this.props.status
    // 检测标签和分类列表数据是否获取到了
    return status !== 'success' ? (
      <LoadingContent status={status} />
    ) : (
      <WriteBlogContent />
    )
  }
}

const mapStateToProps = state => ({
  status: state.writeBlog.status
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestGetTagsAndCategories
    },
    dispatch
  )

WriteBlogContentContainer.propTypes = {
  status: PropTypes.string,
  requestGetTagsAndCategories: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  WriteBlogContentContainer
)
