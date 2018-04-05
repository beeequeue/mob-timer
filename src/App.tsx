import * as React from 'react'
import styled from 'styled-components'

import { TimerContainer } from './containers/Timer'

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
`

export const App = () => (
  <Container>
    <TimerContainer />
  </Container>
)
