import ApiClient from '../../libs/api/ApiClient'
import { failureRequest, finishedRequest, loginSuccess, startRequest } from '../slices/UserSlice'

// const fetchCredentialsSuccess = (navigate) => (response) => {
//   navigate(getPath('home'))
//   return loginSuccess({
//     // de completat
//   })
// }

const loginAction = (data, navigate) => {
  return ApiClient.login(data, {
    start: startRequest,
    success: loginSuccess,
    failure: failureRequest
  })
}

const registerAction = (data, navigate) => {
  return ApiClient.register(data, {
    start: startRequest,
    success: finishedRequest,
    failure: failureRequest
  })
}
export { loginAction, registerAction }
