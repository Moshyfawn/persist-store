import { handleActions, createAction } from 'redux-actions'
import Immutable from 'seamless-immutable'

// ---
// CONSTANTS
// ---

export const SIGN_IN = 'user/SIGN_IN'
export const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS'
export const SIGN_IN_FAIL = 'user/SIGN_IN_FAIL'

export const LOGOUT = 'user/LOGOUT'

// ---
// ACTION CREATORS
// ---

export const signIn = createAction(SIGN_IN)
export const signInSuccess = createAction(SIGN_IN_SUCCESS)
export const signInFail = createAction(SIGN_IN_FAIL)

export const logout = createAction(LOGOUT)

// ---
// INITIAL STATE
// ---

const initialState = Immutable({
  profile: {},
  error: '',
  isLoading: false
})

// ---
// REDUCER
// ---
export default handleActions(
  {
    [SIGN_IN]: (state, action) =>
      Immutable.merge(state, { isLoading: true, error: '' }),

    [SIGN_IN_SUCCESS]: (state, action) =>
      Immutable.merge(state, {
        isLoading: false,
        error: '',
        profile: action.payload
      }),

    [SIGN_IN_FAIL]: (state, action) =>
      Immutable.merge(state, { isLoading: false, error: action.payload }),

    [LOGOUT]: (state, action) =>
      Immutable.merge(state, {
        isLoading: false,
        error: '',
        profile: {}
      })
  },
  initialState
)
