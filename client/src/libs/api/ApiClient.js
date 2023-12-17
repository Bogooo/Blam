import config from '../config'
import axios from 'axios'
import * as https from 'https'
import * as http from 'http'

const httpAgent = new http.Agent({ keepAlive: true })
const httpsAgent = new https.Agent({ keepAlive: true })
class ApiClient {
  constructor () {
    this.axios = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 5000,
      httpAgent,
      httpsAgent
    })
  }

  getAxios () {
    return this.axios
  }

  register (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/register',
        data: {
          registration_form: {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            confirmed_password: payload.confirmed_password
          }
        }
      },
      callbacks
    )
  }

  login (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/login',
        data: {
          username: payload.username,
          password: payload.password
        }
      },
      callbacks
    )
  }

  loginWithGoogle (code, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/google/check',
        data: {
          google_login_form: {
            code
          }
        }
      },
      callbacks
    )
  }

  updateUserPassword (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: `/api/user/${payload.id}/change-password`,
        data: {
          current_password: payload.current_password,
          new_password: payload.new_password,
          confirmed_new_password: payload.confirmed_new_password
        }
      },
      callbacks
    )
  }

  updateUserName (payload, callbacks) {
    return this.doRequest(
      {
        method: 'patch',
        url: `/api/user/${payload.id}`,
        data: {
          name: payload.name
        }
      },
      callbacks
    )
  }

  deleteUser (callbacks) {
    return this.doRequest(
      {
        method: 'delete',
        url: '/api/user'
      },
      callbacks
    )
  }

  resetPassword (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/reset-password',
        data: payload
      },
      callbacks
    )
  }

  doRequest (options, callbacks) {
    if (!callbacks) {
      return this.axios(options).then((response) => { return response.data.data })
        .catch((error) => {
          return error
        })
    }

    const { start, success, failure } = callbacks
    return (dispatch) => {
      if (start) {
        dispatch(start())
      }
      return this.axios(options)
        .then((response) => {
          if (response.data.error && failure) {
            return dispatch(failure(response.data.error))
          }
          if (success) {
            return dispatch(success(response.data.data))
          }
        })
        .catch((error) => {
          if (failure) {
            return dispatch(failure(error))
          }
        })
    }
  }
}

const ApiClient = new ApiClient()
export default ApiClient
