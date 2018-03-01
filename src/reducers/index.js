import { combineReducers } from 'redux'
import auth from './auth'
import signInStatus from './signIn'
import tags from './tags'
import categories from './categories'
import writeBlog from './writeBlog'
import blogList from './blogList'

export default combineReducers({
  auth,
  signInStatus,
  tags,
  categories,
  writeBlog,
  blogList
})
