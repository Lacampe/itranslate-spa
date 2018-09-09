import { Feedback } from 'components/ui'

const { Message } = Feedback

// * TYPES *
export const types = {
  LOGIN_START: 'session/LOGIN_START',
  LOGIN_SUCCESS: 'session/LOGIN_SUCCESS',
  LOGIN_ERROR: 'session/LOGIN_ERROR',
  TOKEN_LOGIN_START: 'session/TOKEN_LOGIN_START',
  TOKEN_LOGIN_SUCCESS: 'session/TOKEN_LOGIN_SUCCESS',
  TOKEN_LOGIN_ERROR: 'session/TOKEN_LOGIN_ERROR',
}

// * ACTIONS *
export const actions = {
  loginStart: (email, password, success, error) => (
    dispatch => {
      dispatch({ type: types.LOGIN_START })
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'error') {
          dispatch({ type: types.LOGIN_ERROR })
          error()
          return Message.error(data.error)
        }
        localStorage.setItem('token', data.token)
        dispatch({ type: types.LOGIN_SUCCESS, ...data })
        success()
        Message.success('Signed in successfully!')
      })
    }
  ),
  tokenLoginStart: token => (
    dispatch => {
      dispatch({ type: types.TOKEN_LOGIN_START })
      fetch('http://localhost:3000/verify_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'error') {
          dispatch({ type: types.TOKEN_LOGIN_ERROR })
          return Message.error(data.error)
        }
        dispatch({ type: types.TOKEN_LOGIN_SUCCESS, ...data })
      })
    }
  ),
}

// * REDUCER *
const initialState = {
  loggedIn: false,
  loggingIn: false,
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
    case types.TOKEN_LOGIN_START:
      return { ...state, loggingIn: true }
    case types.LOGIN_SUCCESS:
    case types.TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        token: action.token,
        user: action.user,
      }
    case types.LOGIN_ERROR:
    case types.TOKEN_LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loggingIn: false,
      }
    default:
      return state
  }
}

// * SELECTORS *
export const selectors = {
  isLoggedIn: state => state.session.loggedIn,
  isLoggingIn: state => state.session.loggingIn,
}

export default session
