import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  setTime,
  startTimer,
  stopTimer,
  countDownOneSecond,
} from './actions/timerActions'
import { IState } from './state'

const Container = styled.div`
  text-align: center;
`

interface IStateProps {
  duration: string
  timerLoop: number | undefined
}

interface IActionProps {
  setTime: typeof setTime
  startTimer: typeof startTimer
  stopTimer: typeof stopTimer
  countDownOneSecond: typeof countDownOneSecond
}

const mapState = (state: IState): IStateProps => ({
  duration: state.timer.timeLeft.toString(),
  timerLoop: state.timer.timerLoop,
})

const mapActions = { setTime, startTimer, stopTimer, countDownOneSecond }

export class AppComponent extends React.Component<IStateProps & IActionProps> {
  constructor(props: any) {
    super(props)

    this.setTimeToTen = this.setTimeToTen.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  private setTimeToTen() {
    this.props.setTime('10:00')
  }

  private startTimer() {
    if (this.props.timerLoop) return

    this.props.startTimer(
      setInterval(() => this.props.countDownOneSecond(), 1000) as any
    )
  }

  public render() {
    const { duration, timerLoop } = this.props

    return (
      <Container>
        <p className="App-intro">{duration}</p>

        <button onClick={this.setTimeToTen}>Set time to 10:00</button>

        <button onClick={this.startTimer}>Start timer</button>

        {timerLoop && (
          <button onClick={this.props.stopTimer}>Stop timer</button>
        )}
      </Container>
    )
  }
}

export const App = compose(connect(mapState, mapActions))(AppComponent)
