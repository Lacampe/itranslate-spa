import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './login'

const Public = ({ location }) => (
  <Switch location={location}>
    <Route path='/login' component={Login} />
  </Switch>
)

export default Public
