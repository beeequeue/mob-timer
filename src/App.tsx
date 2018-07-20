import { hot } from 'react-hot-loader'
import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import keydown from 'react-keydown/es'
import styled from 'styled-components'

import { startTimer, stopTimer, setTime } from '@state/actions/timerActions'

import { Time } from './time'
import { IRootState } from './state'
import { TimerContainer } from './containers/Timer'
import { UserContainer } from './containers/Users'
// import { GitHubLink } from './components/GitHubLink'
import { multiBackend } from './utils/dragDropContext'

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

interface IStateProps {
  counting: boolean
  duration: Time
}

const mapState = ({ timer }: IRootState): IStateProps => ({
  counting: timer.counting,
  duration: timer.duration,
})

const mapActions = { startTimer, stopTimer, setTime }
type DispatchProps = typeof mapActions

@DragDropContext(multiBackend)
export class AppComponent extends React.Component<
  IStateProps & DispatchProps
> {
  constructor(props: any) {
    super(props)

    this.toggleTimer = this.toggleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  @keydown('space')
  private toggleTimer() {
    this.props.counting ? this.props.stopTimer() : this.props.startTimer()
  }

  @keydown('r')
  private resetTimer() {
    this.props.stopTimer()
    this.props.setTime(Time.fromTime(this.props.duration))
  }

  public render() {
    return (
      <Container>
        <TimerContainer />

        <UserContainer />

        {/* <GitHubLink /> */}
      </Container>
    )
  }
}

export const App = compose(
  hot(module),
  connect(mapState, mapActions),
)(AppComponent)
