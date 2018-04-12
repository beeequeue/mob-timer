import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import styled from 'styled-components'
import Divider from 'material-ui/es/Divider'
import * as HTML5Backend from 'react-dnd-html5-backend'

import { TimerContainer } from './containers/Timer'
import { UserContainer } from './containers/Users'

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
`

@DragDropContext(HTML5Backend)
export class App extends React.Component {
  public render() {
    return (
      <Container>
        <TimerContainer />

        <Divider />

        <UserContainer />
      </Container>
    ) as any
  }
}
