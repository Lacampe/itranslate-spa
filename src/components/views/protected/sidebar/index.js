import React from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'

const SidebarContainer = styled(Box)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`

const Sidebar = () => (
  <SidebarContainer width={1/6}>

  </SidebarContainer>
)

export default Sidebar
