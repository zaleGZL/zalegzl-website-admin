import axios from 'axios'
import { getIncorrectSignInToken } from './signIn'
import { adminAPIPrefix } from '../constants'

const types = {
  START_VERIFY_TOKEN: 'auth/START_VERIFY_TOKEN',
  GET_CORRECT_TOKEN: 'auth/GET_CORRECT_TOKEN',
  GET_INCORRECT_TOKEN: 'auth/GET_INCORRECT_TOKEN',

  CORRECT_DELETE_TOKEN: 'auth/CORRECT_DELETE_TOKEN'
}

const initState = {
  status: '',
  token: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_VERIFY_TOKEN:
      return {
        ...state,
        status: 'pending'
      }
    case types.GET_CORRECT_TOKEN:
      return {
        status: 'success',
        token: action.payload.token
      }
    case types.GET_INCORRECT_TOKEN:
      return {
        ...state,
        status: 'failure'
      }
    case types.CORRECT_DELETE_TOKEN:
      return {
        status: 'failure',
        token: ''
      }
    default:
      return state
  }
}

export const startVerifyToken = () => ({
  type: types.START_VERIFY_TOKEN
})

export const getCorrectToken = token => ({
  type: types.GET_CORRECT_TOKEN,
  payload: {
    token
  }
})

export const getIncorrectToken = () => ({
  type: types.GET_INCORRECT_TOKEN
})

export const correctDeleteToken = () => ({
  type: types.CORRECT_DELETE_TOKEN
})

export const requestVerifyToken = token => dispatch => {
  dispatch(startVerifyToken())

  // 发送验证token请求
  axios
    .get(`${adminAPIPrefix}/tokens/${token}`)
    .then(() => {
      dispatch(getCorrectToken(token))
    })
    .catch(error => {
      console.log(error)
      dispatch(getIncorrectToken())
    })
}

export const requestDeleteToken = () => (dispatch, getState) => {
  // 获取 redux store 中的 token
  const token = getState().auth.token
  return axios
    .delete(`${adminAPIPrefix}/tokens`, {
      data: {
        token
      }
    })
    .then(response => {
      // 先删除本地localStorage上的token
      window.localStorage.removeItem('adminToken')

      dispatch(correctDeleteToken())
      // 初始化登录界面状态(相当于登录不成功)
      dispatch(getIncorrectSignInToken())
      return true
    })
    .catch(error => {
      console.log(error)
      return false
    })
}
