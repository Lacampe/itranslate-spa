import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import appReducer from './reducers'

const configureStore = () => {
  const store = createStore(
    appReducer,
    {},
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )

  return store
}

export default configureStore
