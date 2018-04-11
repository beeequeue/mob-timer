import * as React from 'react'
import styled from 'styled-components'

import { TimerContainer } from './containers/Timer'

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  user-select: none;
`

export const App = () => (
  <Container>
    <TimerContainer />
  </Container>
)
