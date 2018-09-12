import { combineReducers } from 'redux'

import session from './modules/session'
import conversation from './modules/conversation'

export default combineReducers({
  session,
  conversation,
})
