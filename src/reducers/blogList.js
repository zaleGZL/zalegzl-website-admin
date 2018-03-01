import axios from 'axios'
import { commonAPIPrefix, blogListQs, adminAPIPrefix } from '../constants'

export const types = {
  // 获取博客列表

  START_GET_BLOGLIST: 'blogList/START_GET_BLOGLIST',
  SUCCESS_GET_BLOGLIST: 'blogList/SUCCESS_GET_BLOGLIST',
  FAILURE_GET_BLOGLIST: 'blogList/FAILURE_GET_BLOGLIST'
}

const initState = {
  status: '',
  amount: 0,
  list: [],
  tags: [],
  categories: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_GET_BLOGLIST:
      return {
        ...state,
        status: 'pending'
      }
    case types.SUCCESS_GET_BLOGLIST:
      return {
        status: 'success',
        amount: action.data.count,
        list: action.data.list,
        tags: action.data.tags,
        categories: action.data.categories
      }
    case types.FAILURE_GET_BLOGLIST:
      return {
        ...state,
        status: 'failure'
      }
    default:
      return state
  }
}

// 获取博客列表
const startGetBlogList = () => ({
  type: types.START_GET_BLOGLIST
})

const successGetBlogList = (count, list, tags, categories) => ({
  type: types.SUCCESS_GET_BLOGLIST,
  data: {
    count,
    list,
    tags,
    categories
  }
})
const failureGetBlogList = () => ({
  type: types.FAILURE_GET_BLOGLIST
})

const requestGetBlogList = () => dispatch => {
  dispatch(startGetBlogList())

  // 开始发送获取博客列表请求
  return axios
    .get(`${commonAPIPrefix}/blogs?${blogListQs}`)
    .then(response => {
      const {
        count: amount,
        blogs: list,
        tags,
        categories
      } = response.data.data
      dispatch(successGetBlogList(amount, list, tags, categories))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      dispatch(failureGetBlogList())
      return 'failure'
    })
}

// 删除博客

const requestDeleteBlog = id => (dispatch, getState) => {
  const token = getState().auth.token

  // 发送删除博客请求
  return axios
    .delete(`${adminAPIPrefix}/blogs/${id}`, {
      data: {
        token
      }
    })
    .then(() => {
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

// 更新博客
const requestUpdateBlog = blog => (dispatch, getState) => {
  const token = getState().auth.token
  const { _id, ...blogData } = blog
  console.log(token)
  console.log(blog)

  // 发送更新请求
  return axios
    .put(`${adminAPIPrefix}/blogs/${_id}`, {
      token,
      ...blogData
    })
    .then(() => {
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

export { requestGetBlogList, requestDeleteBlog, requestUpdateBlog }
