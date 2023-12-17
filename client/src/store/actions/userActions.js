import ApiClient from '../../libs/api/ApiClient'
import { failureRequest, loginSuccess, startRequest } from '../slices/UserSlice'
import { getPath } from '../../route/RouteObject'

const fetchCredentialsSuccess = (navigate) => (response) => {
  navigate(getPath('home'))
  return loginSuccess({
    // de completat
  })
}

const loginAction = (data, navigate) => {
  return ApiClient.login(data, {
    start: startRequest,
    success: fetchCredentialsSuccess(navigate),
    failure: failureRequest
  })
}

export { loginAction }
