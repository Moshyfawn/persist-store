import { takeLatest, all, call, put } from 'redux-saga/effects'
import { SIGN_IN, LOGOUT } from './index'
import { signInSuccess, signInFail } from './index'
import { signIn } from './userApi'
import { setupToken } from 'utils/request'

const signInSaga = function*(action) {
  const { username, password } = action.payload
  let req = `username=${username}&password=${password}&grant_type=password`
  try {
    const data = yield call(signIn, req)
    yield call(saveToken, data.access_token)
    yield put(signInSuccess(data.userName))
  } catch (error) {
    yield put(signInFail(error.response.data.error_description))
  }
}

const logoutSaga = function*() {
  try {
    localStorage.removeItem('token')
  } catch (error) {
    yield put(signInFail(error.response.data.message))
  }
}

export function saveToken(token) {
  setupToken(token)
  localStorage.setItem('token', token)
}

export default function*() {
  yield all([takeLatest(SIGN_IN, signInSaga), takeLatest(LOGOUT, logoutSaga)])
}
