import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'

import {
  setTime,
  startTimer,
  stopTimer,
  countDownOneSecond,
} from '@state/actions/timerActions'
import { IState } from '@state/index'
import { Time } from '../time'
import { Countdown } from '../components/Countdown'

const Container = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

interface IStateProps {
  timeLeft: Time
  timerLoop: number | undefined
}

interface IActionProps {
  setTime: typeof setTime
  startTimer: typeof startTimer
  stopTimer: typeof stopTimer
  countDownOneSecond: typeof countDownOneSecond
}

const mapState = (state: IState): IStateProps => ({
  timeLeft: state.timer.timeLeft,
  timerLoop: state.timer.timerLoop,
})

const mapActions = { setTime, startTimer, stopTimer, countDownOneSecond }

class TimerComponent extends React.Component<IStateProps & IActionProps> {
  constructor(props: any) {
    super(props)

    this.setTimeToTen = this.setTimeToTen.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  private setTimeToTen() {
    this.props.setTime('00:03')
  }

  private startTimer() {
    if (this.props.timerLoop) return

    this.props.startTimer(setInterval(
      () => this.props.countDownOneSecond(),
      1000
    ) as any)
  }

  public render() {
    const { timeLeft, timerLoop } = this.props

    return (
      <Container>
        <Countdown time={timeLeft} />

        <RaisedButton onClick={this.setTimeToTen} label="Set time to 00:03" />

        <br />
        <br />

        <RaisedButton onClick={this.startTimer} primary={true} label="Start" />

        <RaisedButton
          onClick={this.props.stopTimer}
          disabled={!timerLoop}
          secondary={true}
          label="Stop"
        />
      </Container>
    )
  }
}

export const TimerContainer = compose(connect(mapState, mapActions))(
  TimerComponent
)
