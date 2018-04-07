import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'

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
  align-items: center;
`

const Button = styled(FlatButton)`
  flex-shrink: 0;
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

class TimerComponent extends React.PureComponent<IStateProps & IActionProps> {
  constructor(props: IStateProps & IActionProps) {
    super(props)

    this.setTimeToTen = this.setTimeToTen.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  private setTimeToTen() {
    this.props.setTime(new Time(0, 3))
  }

  private startTimer() {
    if (this.props.timerLoop) return

    this.props.startTimer(setInterval(
      () => this.props.countDownOneSecond(),
      1000
    ) as any)
  }

  public render() {
    return (
      <Container>
        <Countdown time={timeLeft} />

        <Button onClick={this.setTimeToTen} label="Set time to 00:03" />

        <br />
        <br />

        <Button onClick={this.startTimer} primary={true} label="Start" />

        <Button
          onClick={this.props.stopTimer}
          disabled={!this.props.timerLoop}
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
