import { fork } from 'redux-saga/effects'

import { userSaga } from 'store/user'

export default function* rootSaga() {
  yield fork(userSaga)
}
