import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import SignIn from '../SignIn'
import LoadingPage from '../../components/LoadingPage'
import Main from '../Main'
import { domainSubDir } from '../../constants'
import { requestVerifyToken, getIncorrectToken } from '../../reducers/auth'
import './App.css'

class App extends React.Component {
  componentDidMount() {
    const adminToken = window.localStorage.getItem('adminToken')
    // 浏览器的缓存中若存在token，则先验证token的有效性
    if (adminToken !== null) {
      this.props.requestVerifyToken(adminToken)
    } else {
      // 浏览器中不存在token，则视为token不正确，都是需要重新登录
      this.props.getIncorrectToken()
    }
  }
  render() {
    const getContentByTokenAuth = authStatus => {
      if (authStatus === 'success') {
        return <Main />
      } else if (authStatus === 'failure') {
        return <SignIn />
      } else {
        return <LoadingPage />
      }
    }

    return (
      <Router basename={domainSubDir}>
        {getContentByTokenAuth(this.props.authStatus)}
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  authStatus: state.auth.status
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestVerifyToken,
      getIncorrectToken
    },
    dispatch
  )

App.propTypes = {
  authStatus: PropTypes.string,
  requestVerifyToken: PropTypes.func,
  getIncorrectToken: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
