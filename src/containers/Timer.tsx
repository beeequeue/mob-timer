import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from 'material-ui/es/Button'
import Play from '@material-ui/icons/PlayArrow'
import Reset from '@material-ui/icons/Cached'
import Pause from '@material-ui/icons/Pause'

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

const NonShrinkButton = styled(Button)`
  flex-shrink: 0;
`

interface IStateProps {
  duration: Time
  timeLeft: Time
  timerLoop: number | undefined
}

interface IActionProps {
  setTime: typeof setTime
  startTimer: typeof startTimer
  stopTimer: typeof stopTimer
  countDownOneSecond: typeof countDownOneSecond
}

const mapState = ({ timer }: IState): IStateProps => ({
  duration: timer.duration,
  timeLeft: timer.timeLeft,
  timerLoop: timer.timerLoop,
})

const mapActions = { setTime, startTimer, stopTimer, countDownOneSecond }

class TimerComponent extends React.PureComponent<IStateProps & IActionProps> {
  private startTimer = () => {
    if (this.props.timerLoop) return

    this.props.startTimer(setInterval(
      () => this.props.countDownOneSecond(),
      1000
    ) as any)
  }

  private resetTimer = () => {
    this.props.stopTimer()
    this.props.setTime(Time.fromTime(this.props.duration))
  }

  public render() {
    const { timeLeft, duration, timerLoop } = this.props

    return (
      <Container>
        <Countdown
          time={timeLeft}
          counting={timerLoop ? true : null}
          onChangeTime={this.props.setTime}
        />

        <br />
        <br />

        <NonShrinkButton
          onClick={this.startTimer}
          disabled={duration.equals(new Time(0, 0))}
          color="primary"
        >
          <Play style={{ marginRight: '2px' }} />
          Start
          {timeLeft.toSeconds() === 0 &&
            duration.toSeconds() !== 0 &&
            ' from ' + duration.toString()}
        </NonShrinkButton>

        <NonShrinkButton onClick={this.resetTimer}>
          <Reset style={{ marginRight: '2px' }} />
          Reset
        </NonShrinkButton>

        <NonShrinkButton
          onClick={this.props.stopTimer}
          disabled={!this.props.timerLoop}
          color="secondary"
        >
          <Pause style={{ marginRight: '2px' }} />
          Pause
        </NonShrinkButton>
      </Container>
    )
  }
}

export const TimerContainer = compose(connect(mapState, mapActions))(
  TimerComponent
)
