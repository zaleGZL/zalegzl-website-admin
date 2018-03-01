import axios from 'axios'
import { adminAPIPrefix } from '../constants'

export const types = {
  // 获取所有分类

  START_GET_CATEGORIES: 'categories/START_GET_CATEGORIES',
  SUCCESS_GET_CATEGORIES: 'categories/SUCCESS_GET_CATEGORIES',
  FAILURE_GET_CATEGORIES: 'categories/FAILURE_GET_CATEGORIES',

  // 新建分类

  SUCCESS_ADD_CATEGORY: 'categories/SUCCESS_ADD_CATEGORY',

  // 删除分类

  SUCCESS_DELETE_CATEGORY: 'categories/SUCCESS_DELETE_CATEGORY'
}

const initState = {
  data: [],
  status: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_GET_CATEGORIES:
      return {
        data: [],
        status: 'pending'
      }
    case types.SUCCESS_GET_CATEGORIES:
      return {
        data: action.data,
        status: 'success'
      }
    case types.FAILURE_GET_CATEGORIES:
      return {
        data: [],
        status: 'failure'
      }
    case types.SUCCESS_ADD_CATEGORY:
      return {
        ...state,
        data: [...state.data, action.data]
      }
    case types.SUCCESS_DELETE_CATEGORY:
      return {
        ...state,
        data: state.data.filter(category => category !== action.data)
      }
    default:
      return state
  }
}

// 获取所有分类

const startGetCategories = () => ({
  type: types.START_GET_CATEGORIES
})

const successGetCategories = categories => ({
  type: types.SUCCESS_GET_CATEGORIES,
  data: categories
})

const failureGetCategories = () => ({
  type: types.FAILURE_GET_CATEGORIES
})

const requestGetCategories = () => (dispatch, getState) => {
  dispatch(startGetCategories())

  // 发送获取请求
  const token = getState().auth.token
  return axios
    .get(`${adminAPIPrefix}/categories`, {
      params: {
        token
      }
    })
    .then(response => {
      const categories = response.data.data
      dispatch(successGetCategories(categories))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      dispatch(failureGetCategories())
      return 'failure'
    })
}

// 添加新分类

const successAddCategory = category => ({
  type: types.SUCCESS_ADD_CATEGORY,
  data: category
})

const requestAddCategory = category => (dispatch, getState) => {
  // 发送添加分类请求
  const token = getState().auth.token
  return axios
    .post(`${adminAPIPrefix}/categories`, {
      token,
      name: category
    })
    .then(() => {
      dispatch(successAddCategory(category))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

// 删除分类

const successDeleteCategory = category => ({
  type: types.SUCCESS_DELETE_CATEGORY,
  data: category
})

const requestDeleteCategory = category => (dispatch, getState) => {
  // 发送删除分类请求
  const token = getState().auth.token
  return axios
    .delete(`${adminAPIPrefix}/categories`, {
      data: {
        token,
        name: category
      }
    })
    .then(() => {
      dispatch(successDeleteCategory(category))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

export { requestGetCategories, requestAddCategory, requestDeleteCategory }
