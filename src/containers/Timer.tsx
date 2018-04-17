import * as React from 'react'
import { connect } from 'react-redux'
import styled, { StyledComponentClass } from 'styled-components'
import { Button, ButtonProps } from 'react-md/lib/Buttons'

import {
  setTime,
  startTimer,
  stopTimer,
  countDownOneSecond,
} from '@state/actions/timerActions'
import { IState as IRootState } from '@state/index'
import { Time } from '../time'
import { Countdown } from '../components/Countdown'
import { KeyboardShortcutsDialog } from '../components/KeyboardShortcutsDialog'

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
  counting: boolean
}

interface IDispatchProps {
  setTime: typeof setTime
  startTimer: typeof startTimer
  stopTimer: typeof stopTimer
  countDownOneSecond: typeof countDownOneSecond
}

const mapState = ({ timer }: IRootState): IStateProps => ({
  duration: timer.duration,
  timeLeft: timer.timeLeft,
  counting: timer.counting,
})

const mapActions = { setTime, startTimer, stopTimer, countDownOneSecond }

interface IState {
  dialogVisible: boolean
}

class TimerComponent extends React.PureComponent<
  IStateProps & IDispatchProps,
  IState
> {
  public state = {
    dialogVisible: false,
  }

  private showDialog = () => this.setState({ dialogVisible: true })

  private hideDialog = () => this.setState({ dialogVisible: false })

  private startTimer = () => {
    if (this.props.counting) return

    this.props.startTimer()
  }

  private resetTimer = () => {
    this.props.stopTimer()
    this.props.setTime(Time.fromTime(this.props.duration))
  }

  public render() {
    const { timeLeft, duration, counting } = this.props

    return (
      <Container>
        <Countdown
          time={timeLeft}
          counting={counting ? 'true' : 'false'}
          onChangeTime={this.props.setTime}
        />

        <NonShrinkButton icon onClick={this.showDialog}>
          keyboard
        </NonShrinkButton>

        <NonShrinkButton
          flat
          primary
          iconChildren="play_arrow"
          disabled={duration.equals(new Time(0, 0)) || counting}
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
          disabled={!this.props.counting}
          onClick={this.props.stopTimer}
        >
          Pause
        </NonShrinkButton>

        <KeyboardShortcutsDialog
          visible={this.state.dialogVisible}
          hide={this.hideDialog}
        />
      </Container>
    )
  }
}

export const TimerContainer = connect(mapState, mapActions)(TimerComponent)
