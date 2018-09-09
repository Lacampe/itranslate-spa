import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import {
  selectors as sessionSelectors,
  actions as sessionActions,
} from 'redux/modules/session'
import Protected from '../protected'
import Public from '../public'

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.tokenLogin(token)
    }
  }

  render() {
    return (
      <Route
        path='/'
        render={props => {
          if (this.props.isLoggedIn) {
            return <Protected {...props} />
          }
          return <Public {...props} />
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: sessionSelectors.isLoggedIn(state),
})

const mapDispatchToProps = dispatch => ({
  tokenLogin: token => dispatch(sessionActions.tokenLoginStart(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
