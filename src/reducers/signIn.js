import axios from 'axios'
import { getCorrectToken } from './auth'
import { adminAPIPrefix } from '../constants'

const types = {
  START_VERIFY_SIGNIN_INFO: 'signIn/START_VERIFY_SIGNIN_INFO',
  GET_CORRECT_SIGNIN_TOKEN: 'signIn/GET_CORRECT_SIGNIN_TOKEN',
  GET_INCORRECT_SIGNIN_TOKEN: 'signIn/GET_INCORRECT_SIGNIN_TOKEN'
}

export default (state = '', action) => {
  switch (action.type) {
    case types.START_VERIFY_SIGNIN_INFO:
      return 'pending'
    case types.GET_CORRECT_SIGNIN_TOKEN:
      return 'success'
    case types.GET_INCORRECT_SIGNIN_TOKEN:
      return 'failure'
    default:
      return state
  }
}

export const startVerifySignInInfo = () => ({
  type: types.START_VERIFY_SIGNIN_INFO
})

export const getCorrectSignInToken = () => ({
  type: types.GET_CORRECT_SIGNIN_TOKEN
})

export const getIncorrectSignInToken = () => ({
  type: types.GET_INCORRECT_SIGNIN_TOKEN
})

export const requestVerifySignInInfo = (account, password) => dispatch => {
  dispatch(startVerifySignInInfo())
  // 开始发送验证登录信息请求
  return axios
    .post(`${adminAPIPrefix}/tokens`, {
      account,
      password
    })
    .then(response => {
      // 先将token写入localStorage
      const token = response.data.data.token
      window.localStorage.setItem('adminToken', token)

      dispatch(getCorrectSignInToken())
      dispatch(getCorrectToken(token))
      return true
    })
    .catch(error => {
      console.log(error)
      dispatch(getIncorrectSignInToken())
      return false
    })
}
