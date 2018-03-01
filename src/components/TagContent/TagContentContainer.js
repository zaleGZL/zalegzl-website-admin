import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoadingContent } from '../Content'
import { requestGetTags } from '../../reducers/tags'
import TagContent from './TagContent'

class TagContentContainer extends React.Component {
  componentDidMount() {
    this.props.requestGetTags()
  }
  render() {
    const status = this.props.status
    // 检测标签数据是否获取到了
    return status !== 'success' ? (
      <LoadingContent>
        {status !== 'failure' ? '加载中...' : '加载数据失败，请刷新页面重试'}
      </LoadingContent>
    ) : (
      <TagContent />
    )
  }
}

const mapStateToProps = state => ({
  status: state.tags.status
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestGetTags
    },
    dispatch
  )

TagContentContainer.propTypes = {
  status: PropTypes.string,
  requestGetTags: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(TagContentContainer)
