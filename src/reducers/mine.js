import axios from 'axios'
import { adminAPIPrefix } from '../constants'

export default (state = null, action) => {
  return state
}

const requestCreateOrUpdateResume = markdownContent => (dispatch, getState) => {
  const token = getState().auth.token

  return axios
    .post(`${adminAPIPrefix}/resumes`, {
      markdownContent,
      token
    })
    .then(() => {
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

export { requestCreateOrUpdateResume }
