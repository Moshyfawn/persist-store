import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { enableBatching } from 'redux-batched-actions'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import { loadState, saveState } from './localStorage'

import rootSaga from './saga'

import user from './user'

const persistConfig = {
  key: 'root',
  storage
}

// ---
// REDUCERS
// ---

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

  const rootReducer = enableBatching(
    combineReducers({
      user
    })
  )

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  // store.subscribe(() => {
  //   saveState({
  //     profile: store.getState().user.profile
  //   })
  // })

  return { store, persistor }
}
