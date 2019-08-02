import { post } from 'utils/request'

export const signIn = req =>
  post('/Authorize2/Token', req).then(response => response.data)
