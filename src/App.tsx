import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import keydown from 'react-keydown/es'
import styled from 'styled-components'

import { startTimer, stopTimer, setTime } from '@state/actions/timerActions'
import { TimerContainer } from './containers/Timer'
import { UserContainer } from './containers/Users'
// import { GitHubLink } from './components/GitHubLink'
import { multiBackend } from './utils/dragDropContext'
import { Time } from './time'
import { IRootState } from './state'

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

interface IDispatchProps {
  startTimer: typeof startTimer
  stopTimer: typeof stopTimer
  setTime: typeof setTime
}

const mapState = ({ timer }: IRootState): IStateProps => ({
  counting: timer.counting,
  duration: timer.duration,
})

const mapActions: IDispatchProps = { startTimer, stopTimer, setTime }

export class AppComponent extends React.Component<
  IStateProps & IDispatchProps
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
  connect(mapState, mapActions),
  DragDropContext(multiBackend)
)(AppComponent)
