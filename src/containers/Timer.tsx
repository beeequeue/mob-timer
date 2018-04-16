import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import styled, { StyledComponentClass } from 'styled-components'
import { Button, ButtonProps } from 'react-md/lib/Buttons'

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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 25px;
  text-align: center;
`

const NonShrinkButton: StyledComponentClass<ButtonProps, {}> = styled(Button)`
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
          counting={timerLoop ? 'true' : 'false'}
          onChangeTime={this.props.setTime}
        />

        <br />
        <br />

        <NonShrinkButton
          flat
          primary
          iconChildren="play_arrow"
          disabled={duration.equals(new Time(0, 0))}
          onClick={this.startTimer}
        >
          Start
          {timeLeft.toSeconds() === 0 &&
            duration.toSeconds() !== 0 &&
            ' from ' + duration.toString()}
        </NonShrinkButton>

        <NonShrinkButton flat iconChildren="cached" onClick={this.resetTimer}>
          Reset
        </NonShrinkButton>

        <NonShrinkButton
          flat
          secondary
          iconChildren="pause"
          disabled={!this.props.timerLoop}
          onClick={this.props.stopTimer}
        >
          Pause
        </NonShrinkButton>
      </Container>
    )
  }
}

export const TimerContainer = compose(connect(mapState, mapActions))(
  TimerComponent
)
