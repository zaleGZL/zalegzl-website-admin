import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LoadingContent } from '../Content'
import { requestGetCategories } from '../../reducers/categories'
import CategoryContent from './CategoryContent'

class CategoryContentContainer extends React.Component {
  componentDidMount() {
    this.props.requestGetCategories()
  }
  render() {
    const status = this.props.status
    // 检测分类数据是否获取到了
    return status !== 'success' ? (
      <LoadingContent status={status} />
    ) : (
      <CategoryContent />
    )
  }
}

const mapStateToProps = state => ({
  status: state.categories.status
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestGetCategories
    },
    dispatch
  )

CategoryContentContainer.propTypes = {
  status: PropTypes.string,
  requestGetCategories: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryContentContainer
)
