import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

const ChatContainer = styled(Box)`
  height: 100%;
`

class Chat extends Component {
  render() {
    return (
      <p>this is the chat</p>
    )
  }
}

export default connect(null, null)(Chat)
