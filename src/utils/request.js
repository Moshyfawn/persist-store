import axios from 'axios'

const request = axios.create()

request.defaults.baseURL = 'https://alphaone.ru'
request.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
request.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

export const setupToken = token => {
  request.defaults.headers.common.Authorization = token
}

export const resetToken = () => {
  request.defaults.headers.common.Authorization = undefined
}

request.interceptors.request.use(
  request => request,
  error => {
    console.log(error)
  }
)

request.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // TODO Navigate to Login
    }
    return Promise.reject(error)
  }
)

export const post = async (url, data, config = {}) =>
  request.post(url, data, config)
export const get = async (url, config = {}) => request.get(url, config)
export const put = async (url, data, config = {}) =>
  request.put(url, data, config)
export const del = async (url, config = {}) => request.delete(url, config)
export const patch = async (url, data, config = {}) =>
  request.patch(url, data, config)
