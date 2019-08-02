import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { enableBatching } from 'redux-batched-actions'
import createSagaMiddleware from 'redux-saga'

import { loadState, saveState } from './localStorage'

import rootSaga from './saga'

import user from './user'

// ---
// REDUCERS
// ---

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const persistedState = loadState()
  const middlewares = [sagaMiddleware]

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

  const rootReducer = enableBatching(
    combineReducers({
      user
    })
  )

  const store = createStore(rootReducer, persistedState, enhancer)

  sagaMiddleware.run(rootSaga)

  store.subscribe(() => {
    saveState({
      profile: store.getState().user.profile
    })
  })

  return store
}
