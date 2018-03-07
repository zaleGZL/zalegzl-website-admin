import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Input, Button, message } from 'antd'
import { requestCreateOrUpdateResume } from '../../reducers/mine'

const { TextArea } = Input
const StyledInputGroupContainer = Styled.div`
  max-width: 450px;
  margin: 15px auto;
`

class ResumeInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      markdownContent: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e) {
    this.setState({ markdownContent: e.target.value })
  }

  onClick() {
    const hide = message.loading('发布中...')
    this.props
      .requestCreateOrUpdateResume(this.state.markdownContent)
      .then(status => {
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
    return (
      <StyledInputGroupContainer>
        <TextArea
          placeholder="markdown格式的简历内容"
          value={this.state.markdownContent}
          onChange={this.onChange}
          autosize={{ minRows: 6, maxRows: 8 }}
          style={{ marginTop: '15px' }}
        />
        <Button
          type="primary"
          style={{ marginTop: '15px', width: '100%' }}
          onClick={this.onClick}
        >
          发布
        </Button>
      </StyledInputGroupContainer>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCreateOrUpdateResume
    },
    dispatch
  )

ResumeInput.propTypes = {
  requestCreateOrUpdateResume: PropTypes.func
}

export default withRouter(connect(null, mapDispatchToProps)(ResumeInput))
