import config from '../config'
import axios from 'axios'

class ApiClientClass {
  constructor () {
    this.axios = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 10000
    })
  }

  getAxios () {
    return this.axios
  }

  register (payload, callbacks) {
    return this.doRequest(
      {
        method: 'post',
        url: '/api/user',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          confirmed_password: payload.confirm_password,
          is_admin: false
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

  updateUserByAdmin (payload) {
    return this.doRequest(
      {
        method: 'put',
        url: '/api/user/admin/modifyUser',
        data: {
          user: payload.user,
          name: payload.name,
          email: payload.email,
          password: payload.password,
          is_admin: payload.admin
        }
      }
    )
  }

  getUsers () {
    return this.doRequest(
      {
        method: 'get',
        url: '/api/user'
      }
    )
  }

  getMoviesBySearch (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/${payload}`
      }
    )
  }

  getMoviesByCategory (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/category/${payload}`
      }
    )
  }

  getMovieById (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/idMovie/${payload}`
      }
    )
  }

  getActor (payload) {
    return this.doRequest(
      {
        method: 'get',
        url: `/movie/idMovie/${payload}`
      }
    )
  }

  updateUser (payload, callbacks) {
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

  deleteUser (payload) {
    return this.doRequest(
      {
        method: 'delete',
        url: `/api/user/${payload}`
      }
    )
  }

  doRequest (options, callbacks) {
    if (!callbacks) {
      return this.axios(options).then((response) => { return response.data })
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

const ApiClient = new ApiClientClass()
export default ApiClient
