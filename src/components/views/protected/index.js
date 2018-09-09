import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ActionCable from 'actioncable'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

import Sidebar from './sidebar'
import { ConversationsList, Chat } from './conversations'

const PageContainer = styled(Flex)`
  height: 100vh;
  width: 100vw;
`

class Protected extends Component {
  constructor() {
    super()

    this.App.cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  }

  App = this.App || {}

  render() {
    return (
      <PageContainer>
          <Switch location={this.props.location}>
            <Route path='/login'>
              <Redirect to='/' />
            </Route>
            <Route path='/signup'>
              <Redirect to='/' />
            </Route>
          </Switch>

          <Route path='/' component={Sidebar} />
          <Route path='/' component={ConversationsList} />
          <Route path='/' component={Chat} />
      </PageContainer>
    )
  }
}

export default Protected
