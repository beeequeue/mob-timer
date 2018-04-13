import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import styled from 'styled-components'
import { Divider } from 'react-md/lib/Dividers'
import * as HTML5Backend from 'react-dnd-html5-backend'

import { TimerContainer } from './containers/Timer'
import { UserContainer } from './containers/Users'
import { GitHubLink } from './components/GitHubLink'

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  user-select: none;
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`

@DragDropContext(HTML5Backend)
export class App extends React.Component {
  public render() {
    return (
      <Container>
        <TimerContainer />

        <Divider />

        <UserContainer />

        <GitHubLink />
      </Container>
    ) as any
  }
}
